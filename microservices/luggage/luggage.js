const express = require('express');
const router = express.Router();
const { Luggage } = require('../../models');

// Get all luggage items
router.get('/', async (req, res) => {
  try {
    const luggageItems = await Luggage.findAll();
    res.json(luggageItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new luggage item
router.post('/', async (req, res) => {
  const { weight, description } = req.body;
  try {
    const newLuggage = await Luggage.create({
      weight,
      description,
    });
    res.status(201).json(newLuggage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;