import { DynamicContentShowcasePage } from './app.po';

describe('dynamic-content-showcase App', () => {
  let page: DynamicContentShowcasePage;

  beforeEach(() => {
    page = new DynamicContentShowcasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
