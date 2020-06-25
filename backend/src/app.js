require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const passportConfig = require('./passport/passportConfig.js');
const cookieSession = require('cookie-session');
const cors = require('cors');

// db connection
const { dbConnect } =  require('./db/dbConnect.js');

// controllers
const modelRouter = require('./routes/ModelRouter.js');
const authRouter = require('./routes/AuthRouter.js');

dbConnect().then(connection => {
    console.log("Connected to db");

    app.use(cors({credentials: true, origin: true}));
    app.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/api', modelRouter);
    app.use('/auth', authRouter);
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