const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
 
  title :String,
  location: String,
  soilType: String,
  price: String,
  // status: {
  //   type: String,
  //   default: 'Available'
  // },
  ownerName: String,
  owneraddress:String,
  mobile: String,
  availableFrom: Date,
  notes: String,
  image: String,
  pdf: String,
  area:String,

  available: { type: String, default: true }
});

const Land = mongoose.model('Land', landSchema);

module.exports = Land;

