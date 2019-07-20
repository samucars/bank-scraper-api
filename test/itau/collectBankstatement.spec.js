const assert = require('assert');
const { stub } = require('sinon');

const collectBankstatement = require('../../src/itau/collectBankstatement');

describe.skip('A middleware that collect bank statement', () => {
  const res = null;
  const req = {
    logger: { info: () => {} },
    page: { evaluate: stub() },
    browser: { close: stub() }
  };

  beforeEach(() => {
    req.page.evaluate.reset();
  });

  it('should select the date column', async () => {
    await collectBankstatement(req, res, err => assert.equal(err, undefined));
    assert.equal(req.page.click.firstCall.args[0], '#VerExtrato');
    assert.equal(req.page.waitFor.firstCall.args[0], 2000);
  });
});
