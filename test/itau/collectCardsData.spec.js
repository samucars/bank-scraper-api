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

  beforeEach(() => {
    const cards = [
      {
        children: [
          { innerText: 'cartão' },
          { innerText: 'data' },
          { innerText: 'valor' },
          { innerText: 'fatura' },
        ]
      },
      {
        children: [
          { innerText: 'cartão x' },
          { innerText: '00/00/0000' },
          { innerText: '0,00' },
          { innerText: 'aberta' },
        ]
      }
    ];
    req.page.$$eval.callsFake((selector, callback) => callback(cards));
  });

  it('should click on the "box" to display the cards', async () => {
    await collectCardsData(req, res, err => assert.equal(err, undefined));
    assert.equal(req.page.click.firstCall.args[0], '#accordionExibirBoxCartoes');
    assert.equal(req.page.waitFor.firstCall.args[0], 3000);
  });
  it('should return a cards data', async () => {
    await collectCardsData(req, res, err => assert.equal(err, undefined));
    assert.equal(req.page.$$eval.firstCall.args[0], '#exibirBoxCartoes .conteudo table tr');
    assert.equal(req.cards[0].name, 'cartão x');
    assert.equal(req.cards[0].dueDate, '00/00/0000');
    assert.equal(req.cards[0].value, '0,00');
  });
  it('should return a error for function callback', async () => {
    req.page.waitFor.throws({ message: 'error' });
    await collectCardsData(req, res, err => assert.equal(err.message, 'error'));
  });
});
