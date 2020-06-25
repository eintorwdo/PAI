const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'REGULAR']
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // hash the password using our new salt
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});


UserSchema.methods.validPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {
        if(err) return cb(err);
        cb(null, result);
    });
}

const User = mongoose.model('User', UserSchema);
module.exports = User;