const express = require('express');
const router = express.Router();
const transactionController =  require ('../controllers/TransactionsController');
router.get('/',transactionController.index);
router.get('/pending',transactionController.pending);
router.put('/approval/:id',transactionController.store);
module.exports = router ;