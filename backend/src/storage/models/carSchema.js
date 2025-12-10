const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    fuel: {
        type: String,
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid'],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    photos: {
        type: [String],
        default: []
    },
    condition: {
        type: String,
        enum: ['New', 'Used'],
    },
    transmission: {
        type: String,
        enum: ['Automatic', 'Mechanic'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Car', carSchema);