const express = require('express');
const multer = require('multer');
const path = require('path');
const Contract = require('../models/Contract'); // Adjust path if needed

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.json(contracts);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Handle contract form submission
router.post(
  '/',
  upload.fields([
    { name: 'permissionPDF', maxCount: 1 },
    { name: 'eSignature', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        buyerName,
        farmerName,
        cropType,
        quantity,
        priceRange,
        advancePayment,
        terms,
        startDate,
        endDate
      } = req.body;

      const permissionPDF = req.files?.permissionPDF?.[0]?.path || '';
      const eSignature = req.files?.eSignature?.[0]?.path || '';

      const contract = new Contract({
        buyerName,
        farmerName,
        cropType,
        quantity,
        priceRange,
        advancePayment,
        terms,
        startDate,
        endDate,
        permissionPDF,
        eSignature,
        status: 'pending'
      });

      await contract.save();
      res.status(201).json({ message: 'Contract created successfully' });
    } catch (error) {
      console.error('Error creating contract:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// PATCH - Update contract status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;

  if (!['accepted', 'rejected', 'suggested'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const updatedContract = await Contract.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedContract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.status(200).json(updatedContract);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/contracts/:id/suggest-edit', async (req, res) => {
  try {
    const { priceRange, terms } = req.body;
    const contract = await Contract.findByIdAndUpdate(req.params.id, {
      suggestedEdits: { priceRange, terms }
    }, { new: true });

    res.json(contract);
  } catch (err) {
    res.status(500).json({ message: 'Error suggesting edit' });
  }
});


module.exports = router;
