const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');

// Include other route files
const { verifyToken, router: authRouter }  = require('./auth');
const usersRouter = require('./user');
const currRouter = require('./currency_rates');

// Use the routes
router.use('/', authRouter);

router.use('/currency',verifyToken, currRouter);
router.use('/user', verifyToken, usersRouter); 





module.exports = router;
