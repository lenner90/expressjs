const { DataTypes } = require('sequelize');
const { conn_currency } = require('./index');


const CurrencyRates = conn_currency.define('Curr', {
    base_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    target_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rate: {
        type: DataTypes.DECIMAL(20, 10),
        allowNull: false
    },
    date_updated: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // Add more fields as needed
},{
    tableName: 'currency_rates',
    timestamps: false 
});

module.exports = CurrencyRates;