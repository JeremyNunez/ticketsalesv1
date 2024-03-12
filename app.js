const express = require('express');
require('dotenv').config();
const { sequelize } = require('./models');
const routesRouter = require('./microservices/routes/routes');
const luggageRouter = require('./microservices/luggage/luggage');
const seatsRouter = require('./microservices/seats/seats');
const paymentsRouter = require('./microservices/payments/payments');
const ticketsRouter = require('./microservices/tickets/tickets');


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use('/routes', routesRouter)
app.use('/luggage', luggageRouter);
app.use('/seats', seatsRouter);
app.use('/payments', paymentsRouter);
app.use('/tickets', ticketsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the flight tickets API!');
});

// Start server
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
      await sequelize.sync({ alter: true });
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
});