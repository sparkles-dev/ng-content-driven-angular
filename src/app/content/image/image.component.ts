import { Component, OnInit, Input } from '@angular/core';
import { ContentOnCreate } from '../../reactive-content';

@Component({
  selector: 'rc-image',
  template: `<img [attr.src]="src" [attr.alt]="alt" width="500" height="400">`,
  styles: [`img { object-fit: cover; }`]
})
export class ImageComponent implements OnInit, ContentOnCreate {

  @Input()
  public src: string;

  @Input()
  public alt: string;

  constructor() { }

  ngOnInit() {
  }

  contentOnCreate(values: { [key: string]: any; }): void {
    this.src = values.src;
    this.alt = values.alt;
  }

}
