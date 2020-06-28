const Subscription = require('../model/Subscription.js');
const {ParkingLot} = require('../model/ParkingLot.js');

setInterval(async () => {
    // const newlyExpiredSubs = await Subscription.updateMany({expired: false, endDate: {$gt: new Date()}}, {expired: true});   mongoose does not return updated documents in updateMany
    try{
        let subs = await Subscription.find({expired: false, endDate: {$lt: new Date()}});
        while(subs.length > 0){
            const newlyExpiredSub = await Subscription.findOneAndUpdate({expired: false, endDate: {$lt: new Date()}}, {expired: true});
            if(newlyExpiredSub){
                console.log(`Expired sub: ${newlyExpiredSub._id} - ${newlyExpiredSub.endDate}`);
                const parkingLot = await ParkingLot.findById(newlyExpiredSub.lotID.toString());
                const parkingSpace = parkingLot.parkingSpaces.id(newlyExpiredSub.spaceID);
                parkingSpace.set({isOccupied: false});
                parkingLot.freeSpaces += 1;
                const updatedLot = await parkingLot.save();
                subs = await Subscription.find({expired: false, endDate: {$lt: new Date()}});
            }
        }
    }
    catch(e){
        console.log(e);
    }
}, 1000 * 60);