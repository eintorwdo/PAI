const mongoose = require('mognoose');

const CarSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addDate: {
        type: Date,
        required: true
    }
});

const Car = mongoose.model('Car', CarSchema);
module.exports = { Car };