module.exports = {
    price_tracker_uat: {
        username: process.env.USERNAME,
        password: 'k0qk65sw',
        database: 'price_tracker',
        host: 'aws-waichoon.cjkymakq625n.ap-southeast-1.rds.amazonaws.com',
        dialect: 'mysql'
    },
    currency_uat: {
        username: 'waichoon',
        password: 'k0qk65sw',
        database: 'currency',
        host: 'aws-waichoon.cjkymakq625n.ap-southeast-1.rds.amazonaws.com',
        dialect: 'mysql'
    },
    production: {
        // Production database configuration
    }
};