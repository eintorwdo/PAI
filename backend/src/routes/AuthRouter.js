const { Router } = require('express');
const router = Router();
const User = require('../model/User.js');
const bcrypt = require('bcrypt');
const validateCredentials = require('../middleware/validateCredentials.js');

router.post('/register', validateCredentials, async (req, res) => {
    const user = await User.find({email: req.body.email});
    if(user.length > 0){
        res.status(400).json({error: "Email is already taken"});
    }
    else{
        try{
            const newUser = new User({
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10)
            });
            await newUser.save(newUser);
            res.status(200).json({email: newUser});
        }
        catch(err){
            res.status(400).json({error: err._message});
        }
    }
});

module.exports = router