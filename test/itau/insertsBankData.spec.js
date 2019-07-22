const assert = require('assert');
const { stub } = require('sinon');

const insertsBankData = require('../../src/itau/insertsBankData');

describe('A middleware that inserts bank data for the login', () => {
  const res = null;
  const req = {
    logger: { info: () => {} },
    body: { branch: '0001', bankaccount: '111111' },
    page: {
      click: stub(),
      type: stub(),
      waitFor: stub(),
      waitForSelector: stub(),
    },
  };

  it('should insert the bank branch', async () => {
    await insertsBankData(req, res, err => assert.equal(err, undefined));
    assert.equal(req.page.waitForSelector.firstCall.args[0], '#agencia');
    assert.equal(req.page.type.firstCall.args[0], '#agencia');
    assert.equal(req.page.type.firstCall.args[1], '0001');
  });
  it('should insert the bank account', async () => {
    await insertsBankData(req, res, err => assert.equal(err, undefined));
    assert.equal(req.page.waitForSelector.secondCall.args[0], '#conta');
    assert.equal(req.page.type.secondCall.args[0], '#conta');
    assert.equal(req.page.type.secondCall.args[1], '111111');
  });
  it('should click the login button', async () => {
    await insertsBankData(req, res, err => assert.equal(err, undefined));
    assert.equal(req.page.waitFor.firstCall.args[0], 150);
    assert.equal(req.page.click.firstCall.args[0], '#btnLoginSubmit');
  });
  it('should wait for page load', async () => {
    await insertsBankData(req, res, err => assert.equal(err, undefined));
    assert.equal(req.page.waitFor.secondCall.args[0], 20000);
  });
  it('should return a error for function callback', async () => {
    req.page.waitForSelector.throws({ message: 'error' });
    await insertsBankData(req, res, err => assert.equal(err.message, 'error'));
  });
});
