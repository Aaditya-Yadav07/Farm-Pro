const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  buyerName: String,
  farmerName: String,
  cropType: String,
  quantity: Number,
  priceRange: String,
  advancePayment: String,
  terms: String,
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  permissionPDF: String,
  eSignature: String
});


module.exports = mongoose.model('Contract', contractSchema);
