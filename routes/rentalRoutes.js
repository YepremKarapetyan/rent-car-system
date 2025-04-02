const express = require('express');
const { rentCar, returnCar } = require('../controllers/rentalController');
const router = express.Router();

router.post('/', rentCar);
router.post('/return', returnCar);
module.exports = router;