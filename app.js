const express = require('express');
const bodyParser = require('body-parser');
// const {conn_price_tracker} = require('./models');
// const { conn_price_tracker } = require('./models'); 
// const config = require('./config/config');

const app = express();
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    console.error("Error loading .env file:", result.error);
} else {
    console.log("Environment variables loaded successfully:", result.parsed);
}
const { conn_price_tracker } = require('./models'); 

// Use Sequelize with Express
conn_price_tracker.authenticate()
    .then(() => {
        console.log('Connection to database successful');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



// Middleware
app.use(bodyParser.json());

const routes = require('./routes');
app.use('/', routes);
// const app = express();
const PORT = process.env.PORT || 3000;




// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
