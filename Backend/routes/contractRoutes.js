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
        status: 'pending',
        suggestedEdits: { priceRange, terms }

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

// Suggest Edit Route (corrected path)
router.put('/:id/suggest-edit', async (req, res) => {
  try {
    const { priceRange, terms } = req.body;
    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      { suggestedEdits: { priceRange, terms }, status: 'suggested' },
      { new: true }
    );

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.json({ message: 'Edit suggested successfully', contract });
  } catch (err) {
    res.status(500).json({ message: 'Error suggesting edit' });
  }
});

// PUT - Buyer reviews suggested edits
router.put('/:id/review-edit', async (req, res) => {
  const { approve } = req.body;

  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract || !contract.suggestedEdits) {
      return res.status(404).json({ message: 'No suggested edits found' });
    }

    if (approve) {
      // Apply the edits
      contract.priceRange = contract.suggestedEdits.priceRange;
      contract.terms = contract.suggestedEdits.terms;
      contract.status = 'accepted';
    } else {
      contract.status = 'rejected'; // or 'edit_rejected'
    }

    contract.suggestedEdits = undefined; // Clear suggested edits
    await contract.save();

    res.json({ message: approve ? 'Edits approved' : 'Edits rejected', contract });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during review' });
  }
});

// Finalize suggested edit
router.patch('/:id/finalize-edit', async (req, res) => {
  try {
    const { priceRange, terms } = req.body;
    const updated = await Contract.findByIdAndUpdate(
      req.params.id,
      {
        priceRange,
        terms,
        status: 'accepted',
        $unset: { suggestedEdits: 1 }
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error finalizing edit' });
  }
});

// Reject suggested edit
router.patch('/:id/reject-edit', async (req, res) => {
  try {
    const updated = await Contract.findByIdAndUpdate(
      req.params.id,
      {
        $unset: { suggestedEdits: 1 },
        status: 'pending'
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting edit' });
  }
});



module.exports = router;
