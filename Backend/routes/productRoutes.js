// const express = require('express');
// const router = express.Router();
// const {
//   createProduct,
//   getAllProducts,
//   updateProduct,
//   deleteProduct
// } = require('../controllers/productController');

// router.post('/', createProduct);
// router.get('/', getAllProducts);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

// module.exports = router;





// const express = require('express');
// const router = express.Router();
// const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');

// // Define routes for the product
// router.post('/', createProduct); // Create a new product
// router.get('/', getAllProducts); // Get all products
// router.put('/:id', updateProduct); // Update product by ID
// router.delete('/:id', deleteProduct); // Delete product by ID

// module.exports = router;










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
