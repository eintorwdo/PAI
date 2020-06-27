const mongoose = require('mongoose');

const ParkingSpaceSchema = new mongoose.Schema({
    isOccupied: {
        type: Boolean,
        requried: true,
        default: false
    }
});

const ParkingLotSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
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
    },
    parkingSpaces: [
        ParkingSpaceSchema
    ]
});

const ParkingLot = mongoose.model('ParkingLot', ParkingLotSchema);
const ParkingSpace = mongoose.model('ParkingSpace', ParkingSpaceSchema);
module.exports = {ParkingLot, ParkingSpace};