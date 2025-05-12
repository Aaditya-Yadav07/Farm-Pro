const Land = require('../models/Land');


// Get all lands (only available)
const getAllLands = async (req, res) => {
  try {
    const lands = await Land.find(); // Only available lands
    res.status(200).json(lands);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lands' });
  }
};


// Create new land
const createLand = async (req, res) => {
  try {
    const newLand = new Land({
      ...req.body,
      image: req.files.image ? req.files.image[0].path : null,
      pdf: req.files.pdf ? req.files.pdf[0].path : null
    });
    await newLand.save();
    res.status(201).json(newLand);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create land' });
  }
};

// Update land by ID
const updateLand = async (req, res) => {
  try {
    const updatedLandData = {
      ...req.body,
      image: req.files.image ? req.files.image[0].path : req.body.image,
      pdf: req.files.pdf ? req.files.pdf[0].path : req.body.pdf
    };
    const updatedLand = await Land.findByIdAndUpdate(req.params.id, updatedLandData, { new: true });
    res.status(200).json(updatedLand);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update land' });
  }
};

// Delete land by ID
const deleteLand = async (req, res) => {
  try {
    const deletedLand = await Land.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedLand);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete land' });
  }
};

// Toggle availability of land
const toggleAvailability = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    land.available = !land.available;
    await land.save();
    res.status(200).json(land);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle availability' });
  }
};

module.exports = {
  getAllLands,
  createLand,
  updateLand,
  deleteLand,
  toggleAvailability
};

