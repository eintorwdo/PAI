const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Car = require('./Car.js');

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
    // console.log('test')
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.pre('findOneAndUpdate', async function(next) {
    const newPassword = await bcrypt.hash(this.getUpdate().password, 10);
    this.findOneAndUpdate({}, { password: newPassword });
    next();
});


UserSchema.methods.validPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {
        if(err) return cb(err);
        cb(null, result);
    });
}

UserSchema.pre('deleteOne', async function(next) {
    const userID = this.getFilter()["_id"];
    await Car.deleteMany({userID});
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;