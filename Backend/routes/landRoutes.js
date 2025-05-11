const express = require('express');
const multer = require('multer');
const path = require('path');
const landController = require('../controllers/landController');


// Setup file storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Router setup
const router = express.Router();

// Get all lands
router.get('/', landController.getAllLands);


// Create new land
router.post('/', upload.fields([{ name: 'image' }, { name: 'pdf' }]), landController.createLand);

// Update land by ID
router.put('/:id', upload.fields([{ name: 'image' }, { name: 'pdf' }]), landController.updateLand);

// Delete land by ID
router.delete('/:id', landController.deleteLand);

// Toggle availability of land
router.put('/:id/availability', landController.toggleAvailability);

module.exports = router;


