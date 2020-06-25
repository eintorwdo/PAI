const { Router } = require('express');
const User = require('../model/User.js');
const router = Router();
const checkLoggedIn = require('../middleware/checkLoggedIn.js');
const checkAdmin = require('../middleware/checkAdmin.js');
const getUserPreview = require('../utils/getUserPreview.js');
const validateCredentials = require('../middleware/validateCredentials.js');
const validateCredentialsUpdate = require('../middleware/validateCredentialsUpdate.js');

router.get('/user', checkLoggedIn, async (req, res) => {
    try{
        const user = await User.findById(req.user.id);
        if(user){
            res.status(200).json({user: getUserPreview(user)});
        }
        else{
            res.status(404).json({error: 'User not found'}); 
        }
    }
    catch(e){
        res.status(500).json({error: e});
    }
});

router.get('/user/:id', checkLoggedIn, checkAdmin, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(user){
            res.status(200).json({user: getUserPreview(user)});
        }
        else{
            res.status(404).json({error: 'User not found'}); 
        }
    }
    catch(e){
        res.status(500).json({error: e});
    }
});

router.put('/user/:id', checkLoggedIn, checkAdmin, validateCredentialsUpdate, async (req, res) => {
    try{
        const payload = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };
        const user = await User.findByIdAndUpdate(req.params.id, payload, {new: true});
        if(user){
            res.status(200).json({user: getUserPreview(user)});
        }
        else{
            res.status(404).json({error: 'User not found'}); 
        }
    }
    catch(e){
        res.status(500).json({error: e});
    }
});

router.delete('/user/:id', checkLoggedIn, checkAdmin, async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(user){
            res.status(200).json({user: getUserPreview(user)});
        }
        else{
            res.status(404).json({error: 'User not found'}); 
        }
    }
    catch(e){
        res.status(500).json({error: e});
    }
});

module.exports = router