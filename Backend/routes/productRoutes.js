const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');

// Multer handles file fields
router.post(
  '/',
  upload.fields([
    { name: 'landPhoto', maxCount: 1 },
    { name: 'ownershipDocument', maxCount: 1 }
  ]),
  createProduct
);

router.get('/', getAllProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
