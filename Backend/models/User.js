const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    aadhaar: { type: String, required: true },
    userType: { type: String, enum: ['farmer', 'buyer'], required: true },
    cin: { type: String },
    photo: { type: String }, // File path for photo
    location : {type : String, required : true}
});

module.exports = mongoose.model('User', userSchema);
