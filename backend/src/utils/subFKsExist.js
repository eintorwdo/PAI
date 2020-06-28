const {ParkingLot} = require('../model/ParkingLot.js');
const Car = require('../model/Car.js');
const Plan = require('../model/Plan.js');
const mongoose = require('mongoose');

const subFKsExist = async (lotID, carID, planID, userID) => {
    const parkingLot = await ParkingLot.findById(lotID);
    const car = await Car.findById(carID);
    const plan = await Plan.findById(planID);
    const errors = [];
    if(!parkingLot){
        errors.push({message: 'Parking lot not found'});
    }
    if(!car){
        errors.push({message: 'Car not found'});
    }
    if(!plan){
        errors.push({message: 'Subscription plan not found'});
    }
    if(!car.userID.equals(userID)){
        errors.push({message: 'Car does not belong to the request sender'});
    }
    return {errors, documents: {parkingLot, car, plan}};
}

module.exports = subFKsExist;