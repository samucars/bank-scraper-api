const assert = require('assert');
const { stub } = require('sinon');

const insertsPassword = require('../../src/itau/insertsPassword');

describe('A middleware that inserts the password for the login', () => {
  const res = null;
  const req = {
    logger: { info: () => {} },
    body: { password: '146' },
    page: {
      click: stub(),
      $$eval: stub(),
      waitFor: stub(),
      waitForSelector: stub(),
    },
  };

  it('should return the buttons options to login and click on the correct sequence', async () => {
    const buttons = [
      { text: '1 ou 2' },
      { text: '3 ou 4' },
      { text: '5 ou 6' },
      { text: '' },
    ];
    req.page.$$eval.callsFake((selector, callback) => callback(buttons));

    await insertsPassword(req, res, err => assert.equal(err, undefined));

    assert.equal(req.page.waitForSelector.firstCall.args[0], '.teclas');
    assert.equal(req.page.click.firstCall.args[0], '[aria-label="1 ou 2"]');
    assert.equal(req.page.click.secondCall.args[0], '[aria-label="3 ou 4"]');
    assert.equal(req.page.click.thirdCall.args[0], '[aria-label="5 ou 6"]');
  });

  it('should click the login button', () => assert.equal(req.page.click.lastCall.args[0], '#acessar'));
  it('should wait for page load', () => assert.equal(req.page.waitFor.lastCall.args[0], 8000));

  it('should return a error for function callback', async () => {
    req.page.waitForSelector.throws({ message: 'error' });
    await insertsPassword(req, res, err => assert.equal(err.message, 'error'));
  });
});
