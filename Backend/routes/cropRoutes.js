const express = require('express');
const router = express.Router();
const { getAvailableCrops } = require('../controllers/cropController');

router.get('/', getAvailableCrops);

module.exports = router;
