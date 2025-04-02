const express = require('express');
const { getAvailableCars } = require('../controllers/carController');
const router = express.Router();

router.get('/', getAvailableCars);
module.exports = router;