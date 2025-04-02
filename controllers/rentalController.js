const fs = require('fs');
const path = require('path');

const carsPath = path.join(__dirname, '../data/cars.json');
const customersPath = path.join(__dirname, '../data/customers.json');
const rentalsPath = path.join(__dirname, '../data/rentals.json');

const rentCar = (req, res) => {
  const { customerId, carId } = req.body;
  const cars = JSON.parse(fs.readFileSync(carsPath));
  const customers = JSON.parse(fs.readFileSync(customersPath));
  const rentals = JSON.parse(fs.readFileSync(rentalsPath));

  if (!customers.some(c => c.id === customerId)) return res.status(400).send('Customer not found');
  const car = cars.find(c => c.id === carId);
  if (!car || !car.available) return res.status(400).send('Car not available');

  const rental = {
    rentalId: Date.now().toString(),
    customerId,
    carId,
    rentedAt: new Date().toISOString(),
    returnedAt: null
  };

  car.available = false;
  fs.writeFileSync(carsPath, JSON.stringify(cars));
  fs.writeFileSync(rentalsPath, JSON.stringify([...rentals, rental]));

  res.status(201).json(rental);
};

const returnCar = (req, res) => {
  const { rentalId } = req.body;
  const cars = JSON.parse(fs.readFileSync(carsPath));
  const rentals = JSON.parse(fs.readFileSync(rentalsPath));

  const rental = rentals.find(r => r.rentalId === rentalId);
  if (!rental) return res.status(400).send('Rental not found');
  if (rental.returnedAt) return res.status(400).send('Already returned');

  rental.returnedAt = new Date().toISOString();
  const car = cars.find(c => c.id === rental.carId);
  if (car) car.available = true;

  fs.writeFileSync(carsPath, JSON.stringify(cars));
  fs.writeFileSync(rentalsPath, JSON.stringify(rentals));

  res.json(rental);
};

module.exports = { rentCar, returnCar };

