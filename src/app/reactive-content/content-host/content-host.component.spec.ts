import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { ContentHostComponent } from './content-host.component';
import { ContentSourceService } from '../content-source.service';
import { CONTENT_BASE_URL_DEFAULT, CONTENT_MAPPINGS } from '../content';

describe('ContentHostComponent', () => {
  let component: ContentHostComponent;
  let fixture: ComponentFixture<ContentHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        ContentSourceService,
        CONTENT_BASE_URL_DEFAULT,
        {
          provide: CONTENT_MAPPINGS,
          useValue: {}
        }
      ],
      declarations: [ ContentHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
