const startScraper = require('./startScraper');
const insertsBankData = require('./insertsBankData');
const insertsPassword = require('./insertsPassword');
const collectCardsData = require('./collectCardsData');
const collectCreditData = require('./collectCreditData');
const collectBalance = require('./collectBalance');
const collectBankstatement = require('./collectBankstatement');

module.exports = {
  startScraper,
  insertsBankData,
  insertsPassword,
  collectCardsData,
  collectCreditData,
  collectBalance,
  collectBankstatement
};
