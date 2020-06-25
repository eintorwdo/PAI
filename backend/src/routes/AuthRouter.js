const { Router } = require('express');
const router = Router();
const User = require('../model/User.js');
const bcrypt = require('bcrypt');
const validateCredentials = require('../middleware/validateCredentials.js');
const passport = require('passport');
const getUserPreview = require('../utils/getUserPreview.js');

router.post('/register', validateCredentials, async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user){
        res.status(400).json({error: "Email is already taken"});
    }
    else{
        try{
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                role: 'REGULAR'
            });
            await newUser.save(newUser);
            res.status(200).json({user: getUserPreview(newUser)});
        }
        catch(err){
            res.status(500).json({error: err._message});
        }
    }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({ user: getUserPreview(req.user) });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).end();
});

module.exports = router