const { Sequelize } = require('sequelize');
const config = require('../config/config');

const conn_price_tracker = new Sequelize(config.price_tracker_uat);
const conn_currency = new Sequelize(config.currency_uat);


// module.exports = conn_price_tracker;

module.exports = {
    conn_price_tracker,
    conn_currency
};