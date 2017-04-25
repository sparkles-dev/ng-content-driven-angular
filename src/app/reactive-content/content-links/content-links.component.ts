import { Component, EventEmitter, OnChanges, OnInit, Input, Output, SimpleChange } from '@angular/core';
import { ContentDocument } from '../content.interfaces';

export interface LinkWithRel {
  rel: string;
  href: string;
}

@Component({
  selector: 'rc-content-links',
  templateUrl: './content-links.component.html'
})
export class ContentLinksComponent implements OnChanges, OnInit {

  public links: LinkWithRel[] = [];

  @Input()
  public document: ContentDocument;

  @Output()
  public selected: EventEmitter<LinkWithRel> = new EventEmitter<LinkWithRel>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

    if (changes && changes.document && changes.document.currentValue) {
      this.prepareLinks(changes.document.currentValue);
    }

  }

  private prepareLinks(document: ContentDocument) {

    this.links = Object.keys(document._links)
      .map((rel: string) => {
        const href = document._links[rel].href;

        return { rel, href };
      });

  }

}
