import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render '<img>'`, () => {
    const img = fixture.debugElement.query((el) => el.name === 'img');
    expect(img).toBeTruthy();
  });

  it(`should reference source image from input property 'src'`, () => {
    component.src = '//placekitten.com/300/400';
    fixture.detectChanges();

    const img = fixture.debugElement.query((el) => el.name === 'img');
    expect(img).toBeTruthy();
    expect(img.attributes.src).toBe('//placekitten.com/300/400');
  });

  it(`should render alt text from input property 'alt'`, () => {
    component.alt = 'A very cute kitten';
    fixture.detectChanges();

    const img = fixture.debugElement.query((el) => el.name === 'img');
    expect(img).toBeTruthy();
    expect(img.attributes.alt).toBe('A very cute kitten');
  });

});
