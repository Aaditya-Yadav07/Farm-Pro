const Contract = require('../models/Contract'); 
const path = require('path');
exports.createContract = async (req, res) => {
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

    const newContract = new Contract({
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

    await newContract.save();
    res.status(201).json({ message: 'Contract created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create contract' });
  }
};
