const express = require('express');
const router = express.Router();
const currencyRatesController = require('../controllers/currencyRatesController');

router.get('/getCurrency', currencyRatesController.getCurrencyRates);
router.get('/convertCurrency', currencyRatesController.convertCurrencyRates);

module.exports = router;
