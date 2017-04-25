import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLinksComponent } from './content-links.component';

describe('ContentLinksComponent', () => {
  let component: ContentLinksComponent;
  let fixture: ComponentFixture<ContentLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
