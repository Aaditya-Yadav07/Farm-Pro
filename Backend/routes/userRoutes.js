const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path if your model is somewhere else

// @desc    Get user by ID
// @route   GET /api/user/:id
// @access  Public (for now, later you can make it protected)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Hide password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
