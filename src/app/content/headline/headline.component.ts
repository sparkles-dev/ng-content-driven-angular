import { Component, OnInit, Input } from '@angular/core';
import { ContentOnCreate } from '../../reactive-content';

@Component({
  selector: 'rc-headline',
  template: `<h1>{{ text }}</h1>`
})
export class HeadlineComponent implements OnInit, ContentOnCreate {

  @Input()
  public text: string;

  constructor() { }

  ngOnInit() {
  }

  contentOnCreate(values: { [key: string]: any; }): void {
    this.text = values.text;
  }

}
