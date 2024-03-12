const express = require('express');
const router = express.Router();
const { Ticket } = require('../../models');

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new ticket
router.post('/', async (req, res) => {
  const { number, status } = req.body;
  try {
    const newTicket = await Ticket.create({
      number,
      status,
    });
    res.status(201).json(newTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;