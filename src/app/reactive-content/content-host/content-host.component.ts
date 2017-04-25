import {
  Component,
  OnChanges,
  OnInit,
  ChangeDetectorRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Inject,
  Injector,
  Input,
  Renderer2,
  Type,
  SimpleChange,
  ViewChild,
  ViewContainerRef,
 } from '@angular/core';

import { Http, Response } from '@angular/http';

import { environment } from '../../../environments/environment';
import { ContentSourceService } from '../content-source.service';
import { CONTENT_MAPPINGS } from '../content';
import { ContentOnCreate, ContentEmbeddable, ContentMappingType, ContentDocument } from '../content.interfaces';

const asContentCreate = (component: ComponentRef<any>): ContentOnCreate => {
  if (component.instance
      && component.instance['contentOnCreate']
      && typeof component.instance['contentOnCreate'] === 'function') {

    return component.instance as ContentOnCreate;
  }

  const componentName = component.instance['constructor'].name;
  throw new TypeError(`${componentName} needs to implement interface ContentCreate`);
};

const asContentEmbeddable = (component: ComponentRef<any>): ContentEmbeddable | undefined => {
  if (component.instance
      && component.instance['contentEmbeddable']
      && typeof component.instance['contentEmbeddable'] === 'function') {

    return component.instance as ContentEmbeddable;
  }
};


@Component({
  selector: 'rc-content-host',
  template: `<main><ng-container #container></ng-container></main><pre *ngIf="isDebug"><code>{{ json | json }}</code></pre>`,
})
export class ContentHostComponent implements OnInit, OnChanges {

  public isDebug: boolean = !environment.production;

  public json: any;

  @ViewChild('container', {read: ViewContainerRef})
  public target: ViewContainerRef;

  @Input()
  public document: ContentDocument;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private content: ContentSourceService,
    @Inject(CONTENT_MAPPINGS) private contentMappings: ContentMappingType,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private injector: Injector,
    private renderer: Renderer2
  ) {}


  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

    if (changes && changes.document && changes.document.currentValue) {
      this.updateHostedContent(changes.document.currentValue);
    }

  }

  private updateHostedContent(content: ContentDocument) {

    // clear previous components and views
    this.target.clear();

    console.info('Cleared previous component instances.');

    // update current values
    this.json = content;

    this.renderReactiveContent(content, this.target);

    console.info('Rendered new component instances.');

  }

  private renderReactiveContent(content: ContentDocument, container: ViewContainerRef) {

    // resolve content['_type'] to factory
    const type: Type<any> = this.contentMappings[content._type];
    if (!type) {
      throw new ReferenceError(`No content mapping for type=${content._type}`);
    }

    const componentFactory: ComponentFactory<any> = this.componentFactoryResolver
      .resolveComponentFactory(type);
    // XX: renderer.appendChild() inserts INTO dom element. However, use with caution because ViewRef and ViewContainerRef are not set-up properly
    //const component: ComponentRef<any> = componentFactory.create(this.injector);
    //this.renderer.appendChild(container.element.nativeElement, component.location.nativeElement);
    const component = container.createComponent(componentFactory, container.length, this.injector);
    console.info('Component dynamically created ', component);

    // content lifecycle hook: notify of new values
    const cmpCreate: ContentOnCreate = asContentCreate(component);
    cmpCreate.contentOnCreate(content);

    // render embedded content
    if (content._embedded && Object.keys(content._embedded).length > 0) {

      const cmpEmbeddable: ContentEmbeddable = asContentEmbeddable(component);
      if (cmpEmbeddable) {

        // render in the target element of ContentEmbeddable
        const childContainer = cmpEmbeddable.contentEmbeddable();

        Object.keys(content._embedded).forEach((key: string) => {
          const value = content._embedded[key];

          // XX: recursive rendering
          if (value instanceof Array) {
            value.forEach((v: ContentDocument) => {
              this.renderReactiveContent(v, childContainer);
            });
          } else {
            this.renderReactiveContent(value, childContainer);
          }
        });

      } else {

        // fatal: embedded content must be hosted by ContentEmbeddable
        const cmpName = component.instance['constructor'].name;
        throw new TypeError([`Trying to render embedded content.`,
          `${cmpName} must implement interface ContentEmbeddable`].join(' '));

      }

    }

    component.hostView.detectChanges();

  }

}
