const assert = require('assert');
const { stub } = require('sinon');

const collectCreditData = require('../../src/itau/collectCreditData');

describe('A middleware that collect credit data', () => {
  const res = null;
  const req = {
    logger: { info: () => {} },
    page: {
      click: stub(),
      $$eval: stub(),
      waitFor: stub(),
    },
  };

  it('should click on the "box" to display the credit', async () => {
    await collectCreditData(req, res, err => assert.equal(err, undefined));
    assert.equal(req.page.click.firstCall.args[0], '#accordionExibirBoxCredito');
    assert.equal(req.page.waitFor.firstCall.args[0], 2000);
  });
  it('should return a credit data', async () => {
    req.page.$$eval.callsFake((selector, callback) => callback([{ innerText: '123' }]));
    await collectCreditData(req, res, err => assert.equal(err, undefined));

    assert.equal(req.page.$$eval.firstCall.args[0], '#exibirBoxCredito .conteudo table tr td');
    assert.equal(req.credit, '123');
  });
  it('should return a error for function callback', async () => {
    req.page.waitFor.throws({ message: 'error' });
    await collectCreditData(req, res, err => assert.equal(err.message, 'error'));
  });
});
