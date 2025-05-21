
const Crop = require('../models/Crop');

exports.getAvailableCrops = async (req, res) => {
  try {
    // Fetch only crops that are marked as available
    const crops = await Crop.find({ available: true });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
