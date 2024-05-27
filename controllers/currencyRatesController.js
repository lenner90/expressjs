const currency_rates = require('../models/currency_rates');

const getCurrencyRates = async (req, res) => {
    try {
        const currencies = await currency_rates.findAll();
        res.status(200).json({ currencies });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// get 3 parameter from request convert it from 1 to another
const convertCurrencyRates = async (req, res) => {
    try {
        const { from, to, amount } = req.query;

        if (!from || !to || !amount) {
            return res.status(400).json({ status: 'error', message: 'Missing required query parameters: from, to, amount' });
        }

        // Fetch the latest exchange rate for the 'from' currency
        const rateRecord = await currency_rates.findOne({
            where: { base_code: from, target_code: to },
            order: [['date_updated', 'DESC']]
        });

        if (!rateRecord) {
            return res.status(404).json({ status: 'error', message: 'Currency rate not found' });
        }

        const rate = rateRecord.rate;

        // const convertedAmount = amount * rate;
        const convertedAmount = (amount * rate).toFixed(2);

        res.status(200).json({ status: 'success', message: 'Conversion successful', convertedAmount });
    } catch (error) {
        console.error('Error converting data:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = { getCurrencyRates, convertCurrencyRates };
