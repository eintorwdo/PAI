const mongoose = require('mongoose');

const ParkingSpaceSchema = new mongoose.Schema({
    isOccupied: {
        type: Boolean,
        requried: true,
        default: false
    },
    spaceNumber: {
        type: Number,
        requried: true,
        min: 0
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
    ],
    conflictStamp: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

ParkingLotSchema.pre('update', async function(next) {
    this.update({}, { conflictStamp: new mongoose.Types.ObjectId });
    next();
});

const ParkingLot = mongoose.model('ParkingLot', ParkingLotSchema);
const ParkingSpace = mongoose.model('ParkingSpace', ParkingSpaceSchema);
module.exports = {ParkingLot, ParkingSpace};