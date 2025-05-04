// const multer = require('multer');
// const path = require('path');

// // Set up storage options for Multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');  // The folder where files will be uploaded
//     },
//     filename: (req, file, cb) => {
//         // Create a unique file name by appending timestamp
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// // Multer configuration for handling file uploads
// const upload = multer({ storage: storage });

// module.exports = upload;  // Export the configured upload instance


const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/images');
    } else if (file.mimetype === 'application/pdf') {
      cb(null, 'uploads/ownership');
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Upload middleware
const upload = multer({ storage: storage });

// Example route to handle both uploads
app.post('/api/upload', upload.fields([
  { name: 'landPhoto', maxCount: 1 },
  { name: 'ownershipDocument', maxCount: 1 }
]), (req, res) => {
  const landPhotoPath = req.files['landPhoto'] ? req.files['landPhoto'][0].path : null;
  const ownershipPath = req.files['ownershipDocument'] ? req.files['ownershipDocument'][0].path : null;

  res.json({
    message: 'Files uploaded successfully',
    landPhoto: landPhotoPath,
    ownershipDocument: ownershipPath
  });
});
