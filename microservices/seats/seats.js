// seats.js
const express = require('express');
const router = express.Router();
const { Seat } = require('../../models');

// Get all seats
router.get('/', async (req, res) => {
  try {
    const seats = await Seat.findAll();
    res.json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new seat
router.post('/', async (req, res) => {
  const { number, seatClass } = req.body; // Cambié 'class' a 'seatClass'
  try {
    const newSeat = await Seat.create({
      number,
      class: seatClass, // Cambié 'class' a 'seatClass'
    });
    res.status(201).json(newSeat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;