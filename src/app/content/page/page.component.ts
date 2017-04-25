import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentOnCreate, ContentEmbeddable } from '../../reactive-content';

@Component({
  selector: 'rc-page',
  template: `<ng-container #embed></ng-container>`
})
export class PageComponent implements ContentOnCreate, ContentEmbeddable {

  @ViewChild('embed', {read: ViewContainerRef})
  public embed: ViewContainerRef;

  constructor(
    private title: Title
  ) { }

  contentOnCreate(values: { [key: string]: any; }): void {
    this.title.setTitle(values.title);
  }

  contentEmbeddable(): ViewContainerRef {
    return this.embed;
  }

}
