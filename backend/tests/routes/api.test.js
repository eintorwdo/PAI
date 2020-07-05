const app = require('../../src/app.js');
const supertest = require('supertest');
const request = supertest(app);
const { dbConnect } =  require('../../src/db/dbConnect.js');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const User = require('../../src/model/User.js');
const Subscription = require('../../src/model/Subscription.js');
const Plan = require('../../src/model/Plan.js');
const {ParkingLot, ParkingSpace} = require('../../src/model/ParkingLot.js');
const Car = require('../../src/model/Car.js');

let user1 = require('supertest').agent(app);

beforeAll(async (done) => {
    try{
        await dbConnect();
        await User.create({
            _id: mongoose.Types.ObjectId('5effdd06d8c5e3ddd2afa6bd'),
            email: 'testusr@test.pl',
            password: '123456',
            role: 'ADMIN'
        });

        await Plan.create({
            _id: mongoose.Types.ObjectId('5effe02bae9bcb14d1c9c41d'),
            duration: 2,
            cost: 2
        });

        await ParkingLot.insertMany([
            {
                _id: mongoose.Types.ObjectId('5effe0ceda1e92e116502a7a'),
                city: 'TestCity',
                address: 'testAddress',
                numberOfSpaces: 10,
                freeSpaces: 10,
                parkingSpaces: Array.from({length: 10}, (v, i) => new ParkingSpace({isOccupied: false, spaceNumber: i + 1})),
                conflictStamp: new mongoose.Types.ObjectId
            },
            {
                _id: mongoose.Types.ObjectId('5effe307832c0c7df6c3829c'),
                city: 'TestCity',
                address: 'testAddress2',
                numberOfSpaces: 10,
                freeSpaces: 0,
                parkingSpaces: Array.from({length: 10}, (v, i) => {
                    if(i === 0){
                        return new ParkingSpace({_id: mongoose.Types.ObjectId('5effe56c3f69667a2671ea7c'), isOccupied: true, spaceNumber: i + 1});
                    }
                    else{
                        return new ParkingSpace({isOccupied: true, spaceNumber: i + 1});
                    }
                }),
                conflictStamp: new mongoose.Types.ObjectId
            }
        ]);

        await Car.insertMany([
            {
                _id: mongoose.Types.ObjectId('5effe365046515c0d1f86db6'),
                make: 'testmake1',
                model: 'testmodel1',
                userID: mongoose.Types.ObjectId('5effdd06d8c5e3ddd2afa6bd'),
                addDate: new Date('2020-07-01T03:24:00'),
                regNumber: 'reg1234'
            },
            {
                _id: mongoose.Types.ObjectId('5effe4628e90ea712791d77a'),
                make: 'testmake1',
                model: 'testmodel2',
                userID: mongoose.Types.ObjectId('5effdd06d8c5e3ddd2afa6bd'),
                addDate: new Date('2020-07-01T03:24:00'),
                regNumber: 'reg4321'
            }
        ]);

        await Subscription.create({
            _id: mongoose.Types.ObjectId('5effe470edc973537303e208'),
            userID: mongoose.Types.ObjectId('5effdd06d8c5e3ddd2afa6bd'),
            cost: 2,
            startDate: new Date('2020-07-01T03:25:00'),
            endDate: new Date('2022-07-01T03:24:00'),
            lotID: mongoose.Types.ObjectId('5effe307832c0c7df6c3829c'),
            spaceID: mongoose.Types.ObjectId('5effe56c3f69667a2671ea7c'),
            carID: mongoose.Types.ObjectId('5effe365046515c0d1f86db6'),
            expired: false
        });

        await user1.post('/auth/login').send({email: 'testusr@test.pl', password: '123456'});

        done();
    }
    catch(e){
        console.log(e);
    }
});
    
describe('POST /subscription', () => {

    const validPayload = {
        lotID: '5effe0ceda1e92e116502a7a',
        planID: '5effe02bae9bcb14d1c9c41d',
        carID: '5effe365046515c0d1f86db6'
    };

    const duplicatePayload = {
        lotID: '5effe307832c0c7df6c3829c',
        planID: '5effe02bae9bcb14d1c9c41d',
        carID: '5effe365046515c0d1f86db6'
    };

    const invalidPayload = {
        lotID: '5f0113bf1a76901b839937d3',
        planID: '5f0113ccd592b88ccfced1ec',
        carID: '5f0113d7c93383cada2c5323'
    };

    const notMongoIds = {
        lotID: '1234',
        planID: '3214',
        carID: '3453453'
    };

    const fullLot = {
        lotID: '5effe307832c0c7df6c3829c',
        planID: '5effe02bae9bcb14d1c9c41d',
        carID: '5effe4628e90ea712791d77a'
    };
    
    it('Cannot add subscription when not logged in', async (done) => {
        const res = await request.post('/api/subscription').send(validPayload);
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Not logged in');
        done();
    });

    it('Cannot have 2 active subscriptions for the same parking lot and car', async (done) => {
        const res = await user1.post('/api/subscription').send(duplicatePayload);
        expect(res.status).toBe(400);
        done();
    });

    it('Cannot add subscription if incorrect lot/plan/car ids are supplied', async (done) => {
        const res = await user1.post('/api/subscription').send(invalidPayload);
        expect(res.status).toBe(400);
        expect(res.body.errors.length).toBe(3);
        done();
    });

    it('If a payload does not contain mongoIds, middleware returns error with status code 422', async (done) => {
        const res = await user1.post('/api/subscription').send(notMongoIds);
        expect(res.status).toBe(422);
        expect(res.body.errors.length).toBe(3);
        done();
    });

    it('Cannot add subscription if parking lot is full', async (done) => {
        const res = await user1.post('/api/subscription').send(fullLot);
        expect(res.status).toBe(400);
        expect(res.body.errors.length).toBe(1);
        done();
    });

    it('Everything goes ok, new subscription is returned', async (done) => {
        const res = await user1.post('/api/subscription').send(validPayload);
        expect(res.status).toBe(200);
        expect(res.body.subscription).toBeTruthy();
        done();
    });
});

afterAll(async (done) => {
    try{
        await User.deleteOne({_id: mongoose.Types.ObjectId('5effdd06d8c5e3ddd2afa6bd')});
        await ParkingLot.deleteMany({_id: {$in: [
            mongoose.Types.ObjectId('5effe0ceda1e92e116502a7a'),
            mongoose.Types.ObjectId('5effe307832c0c7df6c3829c')
        ]}});
        await Subscription.findByIdAndDelete('5effe470edc973537303e208');
        await Plan.findByIdAndDelete('5effe02bae9bcb14d1c9c41d');
        await mongoose.connection.close();
        done();
    }
    catch(e){
        console.log(e);
    }
});
    