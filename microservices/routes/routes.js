// routes.js
const express = require('express');
const router = express.Router();
const { Route } = require('../../models');

// Get all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.findAll();
    res.json(routes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new route
router.post('/', async (req, res) => {
  const { origin, destination, date, availableSeats } = req.body;
  try {
    const newRoute = await Route.create({
      origin,
      destination,
      date,
      available_seats: availableSeats,
    });
    res.status(201).json(newRoute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;