// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// // Load environment variables from .env file
// dotenv.config();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// // Import routes
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/crops', cropRoutes);
// const productRoutes = require('./routes/productRoutes');
// const cropRoutes = require('./routes/cropRoutes');

// // Debugging: Log the MongoDB URI to ensure it is loaded correctly
// console.log('MongoDB URI:', process.env.MONGODB_URI);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Failed to connect to MongoDB:', err);
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoutes');
// Load environment variables from .env file
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user', userRoute);
app.use('/uploads', express.static('uploads'));




// ✅ Import routes BEFORE using them
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const cropRoutes = require('./routes/cropRoutes');
const contractRoutes = require('./routes/contractRoutes');

// ✅ Use routes after they are declared
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/contracts', contractRoutes);
// Debugging: Log the MongoDB URI to ensure it is loaded correctly
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process with failure if DB connection fails
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
