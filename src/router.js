const express = require('express');

const error = require('./error');
const itau = require('./itau');
const { loggerMiddleware } = require('./logger');

const { version } = require('../package.json');

const router = express.Router();

router.use(loggerMiddleware);

router.post(
  '/itau',
  itau.validatePayload,
  itau.startScraper,
  itau.insertsBankData,
  itau.insertsPassword,
  itau.collectCardsData,
  itau.collectCreditData,
  itau.collectBalance,
  itau.collectBankstatement,
);

router.get('/health', (req, res) => res.json({ version }));

router.use(error.handlerErrorMiddleware);
router.all('*', error.notFoundMiddleware);

module.exports = router;
