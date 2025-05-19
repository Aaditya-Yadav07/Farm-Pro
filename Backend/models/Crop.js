

const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  cropType: {
    type: String,
    required: true,
  },
  cropExpertise: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  harvestMonth: {
    type: String,
  },
  deliveryMonth: {
    type: String,
  },
  price: {
    type: Number,
  },
  farmerName: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);
