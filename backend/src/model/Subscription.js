const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cost: {
        type: Number,
        required: true,
        min: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    lotID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingLot',
        required: true
    },
    spaceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingSpace',
        required: true
    }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
module.exports = Subscription;