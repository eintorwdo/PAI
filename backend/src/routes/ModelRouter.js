const { Router } = require('express');
const User = require('../model/User.js');
const Car = require('../model/Car.js');
const Plan = require('../model/Plan.js');
const {ParkingLot, ParkingSpace} = require('../model/ParkingLot.js');
const router = Router();
const checkLoggedIn = require('../middleware/checkLoggedIn.js');
const checkAdmin = require('../middleware/checkAdmin.js');
const getUserPreview = require('../utils/getUserPreview.js');
const validateCredentialsUpdate = require('../middleware/validateCredentialsUpdate.js');
const validateNewCar = require('../middleware/validateNewCar.js');
const validateNewPlan = require('../middleware/validateNewPlan.js');
const validateNewParkingLot = require('../middleware/validateNewParkingLot.js');
const mongoose = require('mongoose');

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

router.get('/users', checkLoggedIn, checkAdmin, async (req, res) => {
    try{
        const users = await User.find({}, '_id email role');
        res.status(200).json({users});
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
        const user = await User.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)});
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

router.get('/cars/:userid', checkLoggedIn, async (req, res) => {
    if(req.user.role === 'ADMIN' || req.user.id === req.params.userid){
        try{
            const objectId = mongoose.Types.ObjectId(req.params.userid);
            const cars = await Car.find({userID: objectId});
            res.status(200).json({cars});
        }
        catch(e){
            res.status(500).json({error: e});
        }
    }
    else{
        res.status(401).json({error: 'Not authorized'});
    }
});

router.get('/cars', checkLoggedIn, checkAdmin, async (req, res) => {
    try{
        const cars = await Car.find();
        res.status(200).json({cars});
    }
    catch(e){
        res.status(500).json({error: e});
    }
});

router.get('/car/:id', checkLoggedIn, checkAdmin, async (req, res) => {
    try{
        const car = await Car.findById(req.params.id);
        if(car){
            res.status(200).json({car});
        }
        else{
            res.status(404).json({error: 'Car not found'}); 
        }
    }
    catch(e){
        res.status(500).json({error: e});
    }
});

router.post('/car', checkLoggedIn, validateNewCar, async (req, res) => {
    const car = await Car.findOne({regNumber: req.body.regNumber});
    if(car){
        res.status(400).json({error: "Car with such registration number is already in database"});
    }
    else{
        try{
            const newCar = new Car({
                make: req.body.make,
                model: req.body.model,
                userID: req.user.id,
                addDate: new Date(),
                regNumber: req.body.regNumber
            });
            await newCar.save(newCar);
            res.status(200).json({car: newCar});
        }
        catch(e){
            res.status(500).json({error: e});
        }
    }
});

router.get('/plans', async (req, res) => {
    try{
        const plans = await Plan.find();
        res.status(200).json({plans});
    }
    catch(e){
        res.status(500).json({error: e});
    }
});

router.post('/plan', checkLoggedIn, checkAdmin, validateNewPlan, async (req, res) => {
    const plan = await Plan.findOne({duration: req.body.duration, cost: req.body.cost});
    if(plan){
        res.status(400).json({error: "Such subscription plan already exists"});
    }
    else{
        try{
            const newPlan = new Plan({
                duration: req.body.duration,
                cost: req.body.cost
            });
            await newPlan.save(newPlan);
            res.status(200).json({plan: newPlan});
        }
        catch(e){
            res.status(500).json({error: e});
        }
    }
});

router.get('/parkinglot/:id', checkLoggedIn, async (req, res) => {
    try{
        const parkingLot = await ParkingLot.findById(req.params.id);
        if(parkingLot){
            res.status(200).json({parkingLot});
        }
        else{
            res.status(404).json({error: 'Parking lot not found'}); 
        }
    }
    catch(e){
        res.status(500).json({error: e});
    }
});

router.post('/parkinglot', checkLoggedIn, checkAdmin, validateNewParkingLot, async (req, res) => {
    const parkingLot = await ParkingLot.findOne({city: req.body.city, address: req.body.address, numberOfSpaces: req.body.numberOfSpaces});
    if(parkingLot){
        res.status(400).json({error: "Such parking lot already exists"});
    }
    else{
        try{
            const newParkingLot = new ParkingLot({
                city: req.body.city,
                address: req.body.address,
                numberOfSpaces: req.body.numberOfSpaces,
                freeSpaces: req.body.numberOfSpaces,
                parkingSpaces: Array.from({length: req.body.numberOfSpaces}, () => new ParkingSpace({isOccupied: false}))
            });
            await newParkingLot.save(newParkingLot);
            res.status(200).json({parkingLot: newParkingLot});
        }
        catch(e){
            console.log(e)
            res.status(500).json({error: e});
        }
    }
});

module.exports = router