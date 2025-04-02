const fs = require('fs');
const path = require('path');

const carsPath = path.join(__dirname, '../data/cars.json');

const getAvailableCars = (req, res) => {
  const cars = JSON.parse(fs.readFileSync(carsPath));
  res.json(cars.filter(car => car.available));
};

module.exports = { getAvailableCars };