const express = require('express');
const carRoutes = require('./routes/carRoutes.js');
const rentalRoutes = require('./routes/rentalRoutes.js');
const customerRoutes = require('./routes/customerRoutes.js');

const PORT = 3000

const app = express();
app.use(express.json());

app.use('/cars', carRoutes);
app.use('/rentals', rentalRoutes);
app.use('/customers', customerRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});