import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineComponent } from './headline.component';

describe('HeadlineComponent', () => {
  let component: HeadlineComponent;
  let fixture: ComponentFixture<HeadlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render '<h1>'`, () => {
    component.text = 'foobar';
    fixture.detectChanges();

    const h1 = fixture.debugElement.query((el) => el.name === 'h1');
    expect(h1).toBeTruthy();
    expect(h1.nativeElement.innerHTML).toBe('foobar');
  });

});
