const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');

// Create a new contract
router.post('/', async (req, res) => {
  try {
    const newContract = new Contract(req.body);
    const savedContract = await newContract.save();
    res.status(201).json(savedContract);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all contracts for a user (buyer or farmer)
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const contracts = await Contract.find({
      $or: [{ farmer: userId }, { buyer: userId }]
    }).populate('farmer buyer');
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept a contract
router.put('/:id/accept', async (req, res) => {
  try {
    const updated = await Contract.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject a contract
router.put('/:id/reject', async (req, res) => {
  try {
    const updated = await Contract.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
