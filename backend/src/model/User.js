const mongoose = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        validate: [isEmail, 'Invalid email']

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;