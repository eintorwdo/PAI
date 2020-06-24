const mongoose = require('mongoose');

const ParkingLotSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    numberOfSpaces: {
        type: Number,
        required: true,
        min: 0
    },
    freeSpaces: {
        type: Number,
        required: true,
        min: 0
    }
});

const ParkingLot = mongoose.model('ParkingLot', ParkingLotSchema);
module.exports = ParkingLot;