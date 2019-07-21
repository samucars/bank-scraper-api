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
  beforeEach(() => {
    const credits = [
      {
        children: [
          { innerText: 'nome' },
          { innerText: 'pré-aprovado' },
          { innerText: 'ação' },
        ]
      },
      {
        children: [
          { innerText: 'empréstimo x' },
          { innerText: '7000' },
          { innerText: 'simular' },
        ]
      }
    ];
    req.page.$$eval.callsFake((selector, callback) => callback(credits));
  });

  it('should click on the "box" to display the credit', async () => {
    await collectCreditData(req, res, err => assert.equal(err, undefined));
    assert.equal(req.page.click.firstCall.args[0], '#accordionExibirBoxCredito');
    assert.equal(req.page.waitFor.firstCall.args[0], 2000);
  });
  it('should return a credit data', async () => {
    await collectCreditData(req, res, err => assert.equal(err, undefined));

    assert.equal(req.page.$$eval.firstCall.args[0], '#exibirBoxCredito .conteudo table tr');
    assert.equal(req.credits[0].name, 'empréstimo x');
    assert.equal(req.credits[0].preApprovedValue, '7000');
  });
  it('should return a error for function callback', async () => {
    req.page.waitFor.throws({ message: 'error' });
    await collectCreditData(req, res, err => assert.equal(err.message, 'error'));
  });
});
