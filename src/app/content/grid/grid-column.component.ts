import { Component, HostBinding, ViewChild, ViewContainerRef } from '@angular/core';
import { ContentOnCreate, ContentEmbeddable } from '../../reactive-content';


@Component({
  selector: 'rc-grid-column',
  template: `<ng-container #embed></ng-container>` // `<div class="column {{columnSize}} {{columnOffset}}" #embed></div>`
})
export class GridColumnComponent implements ContentOnCreate, ContentEmbeddable {

  @HostBinding('class')
  public cssClasses: string;

  @ViewChild('embed', {read: ViewContainerRef})
  public embed: ViewContainerRef;

  constructor() {}

  contentOnCreate(values: { [key: string]: any; }): void {
    const size: string = values.size ? `column-${values.size}` : '';
    const offset: string = values.offset ? `column-offset-${values.offset}` : '';
    this.cssClasses = ['column', size, offset].join(' ');
  }

  contentEmbeddable(): ViewContainerRef {
    return this.embed;
  }

}
