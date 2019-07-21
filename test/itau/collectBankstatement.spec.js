const assert = require('assert');
const { stub } = require('sinon');

const collectBankstatement = require('../../src/itau/collectBankstatement');

describe('A middleware that collect bank statement', () => {
  const res = { json: stub() };
  const req = {
    logger: { info: () => {} },
    page: { $$eval: stub() },
    browser: { close: stub() }
  };

  before(async () => {
    const columnDates = [{ innerText: '12 jul' }];
    req.page.$$eval.onCall(0).callsFake((selector, callback) => callback(columnDates));

    const accountingEntries = [{
      children: [
        { innerText: '' },
        { innerText: 'crédio em conta' },
        { innerText: '200' },
        { innerText: '' },
      ]
    }];
    req.page.$$eval.onCall(1).callsFake((selector, callback) => callback(accountingEntries));

    await collectBankstatement(req, res, err => assert.equal(err, undefined));
  });
  beforeEach(() => {
    req.page.$$eval.reset();
  });

  it('should return a bank statement', async () => {
    const { bankstatement } = res.json.firstCall.args[0];
    assert.equal(bankstatement[0].date, '12 jul');
    assert.equal(bankstatement[0].description, 'crédio em conta');
    assert.equal(bankstatement[0].value, '200');
  });
  it('should return a error for function callback', async () => {
    req.page.$$eval.throws({ message: 'error' });
    await collectBankstatement(req, res, err => assert.equal(err.message, 'error'));
  });
});
