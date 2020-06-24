const express = require('express')
let router = express.Router()

router.use((req, res, next) => {
    if(!req.user){
        return res.status(401).json({error: "Not logged in"});
    }
    next();
});

module.exports = router