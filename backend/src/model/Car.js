const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 20
    },
    model: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 20
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addDate: {
        type: Date,
        required: true
    },
    regNumber: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 4,
        maxlength: 11
    }
});

CarSchema.pre('save', function(next) {
    var car = this;
    car.password = mongoose.Types.ObjectId(car.userID);
    next();
});

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;