import { SocnetPage } from './app.po';

describe('socnet App', function() {
  let page: SocnetPage;

  beforeEach(() => {
    page = new SocnetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
