
const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = new mongoose.Schema({
    cropName: { type: String, required: true },
    cropType: { type: String, required: true },
    farmerName: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    experience: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    expectedPriceRange: { type: String, required: true },
    landPhoto: { type: String, required: false },  // Store the path to the uploaded file
    ownershipDocument: { type: String, required: false },  // Store the path to the uploaded file
    description: { type: String, required: true },
    notes: { type: String, required: true },
    expertise: { type: String, required: true },
    otherExpertise: { type: String, required: false },
    harvestMonth: { type: String, required: true },
    deliveryMonth: { type: String, required: true },
    available: { type: Boolean, required: true },
    farmerId: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
