const express = require("express");
const error = require('../middleware/error')
const transactionRoute = require('../route/transactions');


module.exports = function(app){
    app.use(express.json());
    app.use('/api/transaction',transactionRoute);
    app.use(error);
}

