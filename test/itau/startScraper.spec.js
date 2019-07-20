const assert = require('assert');
const puppeteer = require('puppeteer');
const { stub } = require('sinon');

const startScraper = require('../../src/itau/startScraper');

describe('A middleware that start scraper', () => {
  const res = null;
  const req = {
    logger: { info: () => {} }
  };
  const mockPage = {
    newPage: stub().returns({ goto: stub() })
  };

  let stubLaunch;
  beforeEach(() => {
    stubLaunch = stub(puppeteer, 'launch');
  });
  afterEach(() => {
    stubLaunch.restore();
  });

  it('should configure a fake browser', async () => {
    stubLaunch.callsFake(() => Promise.resolve(mockPage));
    await startScraper(req, res, err => assert.equal(err, undefined));

    assert.equal(stubLaunch.firstCall.args[0].defaultViewport.width, 1000);
    assert.equal(stubLaunch.firstCall.args[0].defaultViewport.height, 800);
  });
  it('should define page (https://www.itau.com.br/)', async () => {
    stubLaunch.callsFake(() => Promise.resolve(mockPage));
    await startScraper(req, res, err => assert.equal(err, undefined));

    const page = await mockPage.newPage();
    assert.equal(page.goto.firstCall.args[0], 'https://www.itau.com.br/');
  });
  it('should return a error for function callback', async () => {
    stubLaunch.throws({ message: 'error' });
    await startScraper(req, res, err => assert.equal(err.message, 'error'));
  });
});
