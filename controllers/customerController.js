const fs = require('fs');
const path = require('path');

const rentalsPath = path.join(__dirname, '../data/rentals.json');

const getCustomerRentals = (req, res) => {
  const rentals = JSON.parse(fs.readFileSync(rentalsPath));
  res.json(rentals.filter(r => r.customerId === req.params.id));
};

module.exports = { getCustomerRentals };