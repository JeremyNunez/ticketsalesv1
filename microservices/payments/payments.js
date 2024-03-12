const express = require('express');
const router = express.Router();
const { Payment } = require('../../models');

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new payment
router.post('/', async (req, res) => {
  const { amount, method } = req.body;
  try {
    const newPayment = await Payment.create({
      amount,
      method,
    });
    res.status(201).json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;