import { Component, OnInit } from '@angular/core';
import { ContentSourceService, ContentDocument, LinkWithRel } from './reactive-content';

@Component({
  selector: 'rc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public index: ContentDocument;
  public current: ContentDocument;

  constructor(
    private content: ContentSourceService
  ) {}

  ngOnInit() {

    this.content.index()
      .subscribe((index: ContentDocument) => {
        this.index = index;
        this.current = index;
      });

  }

  onNavigate(link: LinkWithRel) {

    this.content.fetchLink(this.index, link.rel)
      .subscribe((doc: ContentDocument) => {
        this.current = doc;
      });

  }

}
