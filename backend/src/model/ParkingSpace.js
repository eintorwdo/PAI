const mongoose = require('mongoose');

const ParkingSpaceSchema = new mongoose.Schema({
    isOccupied: {
        type: Boolean,
        requried: true
    },
    lotID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingLot',
        required: true
    }
});

const ParkingSpace = mongoose.model('ParkingSpace', ParkingSpaceSchema);
module.exports = ParkingSpace;