const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User.js');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if(err) return done(err);
            if(!user){
                return done(null, false, { message: 'Incorrect email.' });
            }
            user.validPassword(password, (err, match) => {
                if(err) return done(err);
                if(!match){
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        });
    }
));