const express = require('express');

const itau = require('./itau');
const { loggerMiddleware } = require('./logger');

const router = express.Router();

router.use(loggerMiddleware);

router.post(
  '/itau',
  itau.startScraper,
  itau.insertsBankData,
  itau.insertsPassword,
  itau.collectCardsData,
  itau.collectCreditData,
  itau.collectBalance,
  itau.collectBankstatement,
);

router.get('/health', (req, res) => res.json({ version: 1 })); // TODO

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log('-----------------');
  console.log(err);
  res.status(500).send();
});

router.all('*', (req, res) => {
  res.status(404).json({ message: 'resource not found' });
});

module.exports = router;
