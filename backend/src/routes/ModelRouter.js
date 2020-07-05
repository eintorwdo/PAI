const { Router, request } = require('express');
const User = require('../model/User.js');
const Car = require('../model/Car.js');
const Plan = require('../model/Plan.js');
const Subscription = require('../model/Subscription.js');
const {ParkingLot, ParkingSpace} = require('../model/ParkingLot.js');
const router = Router();
const checkLoggedIn = require('../middleware/checkLoggedIn.js');
const checkAdmin = require('../middleware/checkAdmin.js');
const getUserPreview = require('../utils/getUserPreview.js');
const validateCredentialsUpdate = require('../middleware/validateCredentialsUpdate.js');
const validateNewCar = require('../middleware/validateNewCar.js');
const validateNewPlan = require('../middleware/validateNewPlan.js');
const validateNewParkingLot = require('../middleware/validateNewParkingLot.js');
const validateNewSubscription = require('../middleware/validateNewSubscription.js');
const subFKsExist = require('../utils/subFKsExist.js');
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
router.get('/parkinglots', async (req, res) => {
    try{
        const parkingLot = await ParkingLot.find()
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
                parkingSpaces: Array.from({length: req.body.numberOfSpaces}, (v, i) => new ParkingSpace({isOccupied: false, spaceNumber: i + 1})),
                conflictStamp: new mongoose.Types.ObjectId
            });
            await newParkingLot.save(newParkingLot);
            res.status(200).json({parkingLot: newParkingLot});
        }
        catch(e){
            res.status(500).json({error: e});
        }
    }
});

router.post('/subscription', checkLoggedIn, validateNewSubscription, async (req, res) => {
    const subscription = await Subscription.findOne({userID: req.user.id, lotID: req.body.lotID, carID: req.body.carID});
    if(subscription && subscription.expired === false){
        res.status(400).json({error: "You have already purchased a subscription for this parking lot and car"});
    }
    else{
        let {errors, documents} = await subFKsExist(req.body.lotID, req.body.carID, req.body.planID, req.user.id);
        if(documents.parkingLot){
            if(documents.parkingLot.freeSpaces <= 0){
                errors.push({message: 'All parking spaces are occupied'});
            }
        }
        if(errors.length === 0){
            const freeSpaceIndex = documents.parkingLot.parkingSpaces.findIndex(e => e.isOccupied === false);
            documents.parkingLot.parkingSpaces[freeSpaceIndex].isOccupied = true;
            try{
                const newSubscription = new Subscription({
                    userID: mongoose.Types.ObjectId(req.user.id),
                    cost: documents.plan.cost,
                    startDate: new Date(),
                    endDate: new Date(Date.now() + documents.plan.duration * 24 * 60 * 60 * 1000),
                    lotID: mongoose.Types.ObjectId(req.body.lotID),
                    spaceID: documents.parkingLot.parkingSpaces[freeSpaceIndex]._id,
                    carID: mongoose.Types.ObjectId(req.body.carID),
                    expired: false
                });
                const newFreeSpaces = documents.parkingLot.freeSpaces - 1;
                const updateRes = await ParkingLot.update({
                    _id: documents.parkingLot._id,
                    conflictStamp: documents.parkingLot.conflictStamp
                },
                {
                    freeSpaces: newFreeSpaces,
                    parkingSpaces: documents.parkingLot.parkingSpaces
                });
                if(updateRes.n > 0){
                    await newSubscription.save(newSubscription);
                    res.status(200).json({subscription: newSubscription});
                }
                else{
                    res.status(500).json({error: 'There was a conflict, and the transaction cannot finish'});
                }
            }
            catch(e){
                console.log(e)
                res.status(500).json({error: e});
            }
        }
        else{
            res.status(400).json({errors: errors});
        }
    }
});
router.get('/subscriptions/:userid', checkLoggedIn, async (req, res) => {
    if(req.user.role === 'ADMIN' || req.user.id === req.params.userid){
        try{
            const objectId = mongoose.Types.ObjectId(req.params.userid);
            let subscriptions = await Subscription.find({userID: objectId});
            let newSubs = [];
            for(let el of subscriptions){
                const lot = await ParkingLot.findById(el.lotID);
                const parkingSpace = lot.parkingSpaces.filter(space => {
                    return space._id.toString() === el.spaceID.toString()
                });
                let newSub = el.toObject();
                newSub.parkingSpace = parkingSpace[0];
                newSubs.push(newSub);
            }
            res.status(200).json({subscriptions: newSubs});
        }
        catch(e){
            res.status(500).json({error: e});
        }
    }
    else{
        res.status(401).json({error: 'Not authorized'});
    }
});

module.exports = router