require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// db connection
const { dbConnect } =  require('./db/dbConnect.js');

// controllers
const baseRouter = require('./routes/BaseRouter.js');

dbConnect().then(connection => {
    console.log("Connected to db");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', baseRouter);
    app.use('*', (req, res) => {
        res.status(404).json({message: "not found"});
    });
    
    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Listening at port ${port}`)
    });
}).catch(e => {
    console.log(e);
});