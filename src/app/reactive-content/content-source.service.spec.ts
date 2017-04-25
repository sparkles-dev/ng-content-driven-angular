import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ContentSourceService } from './content-source.service';
import { CONTENT_BASE_URL_DEFAULT } from './content';

describe('ContentSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        ContentSourceService,
        MockBackend,
        { provide: XHRBackend, useExisting: MockBackend },
        CONTENT_BASE_URL_DEFAULT
      ]
    });
  });

  it('should create an instance', inject([ContentSourceService], (service: ContentSourceService) => {
    expect(service).toBeTruthy();
  }));

});
