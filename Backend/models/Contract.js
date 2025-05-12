const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
    farmer : { type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    buyer : { type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    crop : String,
    quantity : Number,
    pricePerUnit : Number,
    totalAmount : Number,
    startDate : Date,
    endDate : Date,
    terms : String,
    status : {type : String, enum:['pending', 'active', 'completed', 'rejected'], default: 'pending'}
});

module.exports = mongoose.model('Contract', ContractSchema);