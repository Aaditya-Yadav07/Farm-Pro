const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../models/User');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Multer configuration for photo upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// User SignUp
router.post('/signup', upload.single('photo'), async (req, res) => {
    try {
        const { name, email, mobile, password, aadhaar, userType, cin } = req.body;
        const photo = req.file ? req.file.path : null;

        // Check if email or mobile already exists
        const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or mobile already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
            aadhaar,
            userType,
            cin: userType === 'buyer' ? cin : undefined,
            photo
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { identifier, password, userType } = req.body;

        // Find user by email or mobile
        const user = await User.findOne({
            $or: [{ email: identifier }, { mobile: identifier }],
            userType
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
