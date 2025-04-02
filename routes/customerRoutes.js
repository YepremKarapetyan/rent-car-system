const express = require('express');
const { getCustomerRentals } = require('../controllers/customerController');
const router = express.Router();

router.get('/:id/rentals', getCustomerRentals);
module.exports = router;