const assert = require('assert');
const { stub } = require('sinon');

const collectCardsData = require('../../src/itau/collectCardsData');

describe('A middleware that collect cards data', () => {
  const res = null;
  const req = {
    logger: { info: () => {} },
    page: {
      click: stub(),
      $$eval: stub(),
      waitFor: stub(),
      waitForSelector: stub(),
    },
  };

  it('should click on the "box" to display the cards', async () => {
    await collectCardsData(req, res, err => assert.equal(err, undefined));
    assert.equal(req.page.waitForSelector.firstCall.args[0], '#accordionExibirBoxCartoes');
    assert.equal(req.page.click.firstCall.args[0], '#accordionExibirBoxCartoes');
    assert.equal(req.page.waitFor.firstCall.args[0], 2000);
  });
  it('should return a cards data', async () => {
    req.page.$$eval.callsFake((selector, callback) => callback([{ innerText: '123' }]));
    await collectCardsData(req, res, err => assert.equal(err, undefined));

    assert.equal(req.page.$$eval.firstCall.args[0], '#exibirBoxCartoes .conteudo table tr td');
    assert.equal(req.cards, '123');
  });
  it('should return a error for function callback', async () => {
    req.page.waitFor.throws({ message: 'error' });
    await collectCardsData(req, res, err => assert.equal(err.message, 'error'));
  });
});
