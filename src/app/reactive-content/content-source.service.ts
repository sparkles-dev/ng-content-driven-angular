import { Inject, Injectable, InjectionToken, Provider } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CONTENT_BASE_URL } from './content';
import { ContentDocument } from './content.interfaces';

@Injectable()
export class ContentSourceService {

  constructor(
    private http: Http,
    @Inject(CONTENT_BASE_URL) private baseUrl: string
  ) {}

  public index(): Observable<ContentDocument> {

    return this.http.get(this.baseUrl)
      .map((res: Response) => res.json());
  }

  public fetchLink(document: ContentDocument, rel: string) {
    const link = document._links[rel];

    if (link) {
      // TODO: if (link.templated) ...

      return this.http.get(link.href)
        .map((res: Response) => res.json());
    }

    const availableRels = Object.keys(document._links).join(', ');
    throw new Error(`Link rel=${rel} does not exist in given document. Available rels are ${availableRels}`);

  }

}
