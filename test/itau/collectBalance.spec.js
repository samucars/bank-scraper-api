const assert = require('assert');
const { stub } = require('sinon');

const collectBalance = require('../../src/itau/collectBalance');

describe('A middleware that collect balance', () => {
  const res = null;
  const req = {
    logger: { info: () => {} },
    page: {
      click: stub(),
      $eval: stub(),
      waitFor: stub(),
    },
  };

  beforeEach(() => {
    req.page.$eval.reset();
  });

  it('should click on button for view bank statement', async () => {
    await collectBalance(req, res, err => assert.equal(err, undefined));
    assert.equal(req.page.click.firstCall.args[0], '#VerExtrato');
    assert.equal(req.page.waitFor.firstCall.args[0], 2000);
  });
  it('should return a balance', async () => {
    req.page.$eval.callsFake((selector, callback) => callback({ innerText: 100 }));
    await collectBalance(req, res, err => assert.equal(err, undefined));
    assert.equal(req.balance, 100);
  });
  it('should return a overdraft available', async () => {
    req.page.$eval.callsFake((selector, callback) => callback({ innerText: 500 }));
    await collectBalance(req, res, err => assert.equal(err, undefined));
    assert.equal(req.overdraft.available, 500);
  });
  it('should return a overdraft protection', async () => {
    req.page.$eval.callsFake((selector, callback) => callback({ innerText: 350 }));
    await collectBalance(req, res, err => assert.equal(err, undefined));
    assert.equal(req.overdraft.protection, 350);
  });
  it('should return a error for function callback', async () => {
    req.page.waitFor.throws({ message: 'error' });
    await collectBalance(req, res, err => assert.equal(err.message, 'error'));
  });
});
