import { Component, HostBinding, ViewChild, ViewContainerRef } from '@angular/core';
import { ContentOnCreate, ContentEmbeddable } from '../../reactive-content';


@Component({
  selector: 'rc-grid-row',
  template: `<ng-container #embed></ng-container>` // <div class="row" #embed></div>
})
export class GridRowComponent implements ContentOnCreate, ContentEmbeddable {

  @HostBinding('class.row')
  public row = true;

  @ViewChild('embed', {read: ViewContainerRef})
  public embed: ViewContainerRef;

  constructor() {}

  contentOnCreate(values: { [key: string]: any; }): void {
  }

  contentEmbeddable(): ViewContainerRef {
    return this.embed;
  }

}
