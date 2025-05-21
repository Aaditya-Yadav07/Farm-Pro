const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const {
      cropName,
      cropType,
      farmerName,
      mobile,
      address,
      experience,
      quantity,
      unit,
      expectedPriceRange,
      description,
      notes,
      expertise,
      otherExpertise,
      harvestMonth,
      deliveryMonth,
      available,
      farmerId
    } = req.body;

    const landPhoto = req.files?.landPhoto?.[0]?.path || '';
    const ownershipDocument = req.files?.ownershipDocument?.[0]?.path || '';

    const newProduct = new Product({
      cropName,
      cropType,
      farmerName,
      mobile,
      address,
      experience,
      quantity,
      unit,
      expectedPriceRange,
      description,
      notes,
      expertise,
      otherExpertise,
      harvestMonth,
      deliveryMonth,
      available: available === 'true' || available === true,
      farmerId,
      landPhoto,
      ownershipDocument
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating product' });
  }
};



// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  console.log('Received body:', req.body); // Log the request body
  console.log("Received files:", req.files);
  try {
    const { id } = req.params;
    const { cropName, cropType, farmerName, quantity, expectedPriceRange, description, expertise, harvestMonth, deliveryMonth, available, landPhoto, ownershipDocument, farmerId } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      cropName,
      cropType,
      farmerName,
      quantity,
      expectedPriceRange,
      description,
      expertise,
      harvestMonth,
      deliveryMonth,
      available,
      landPhoto,
      ownershipDocument,
      farmerId
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:",err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting product' });
  }
};
