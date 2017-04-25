import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ContentOnCreate, ContentEmbeddable } from '../../reactive-content';

@Component({
  selector: 'rc-grid',
  template: `<div class="container"><ng-container #embed></ng-container></div>`
})
export class GridComponent implements OnInit, ContentOnCreate, ContentEmbeddable {

  @ViewChild('embed', {read: ViewContainerRef})
  public embed: ViewContainerRef;

  constructor() { }

  ngOnInit() {
  }

  contentOnCreate(values: { [key: string]: any; }): void {
    // TODO
  }

  contentEmbeddable(): ViewContainerRef {
    return this.embed;
  }

}
