const express = require('express')
let router = express.Router()

router.use((req, res, next) => {
    if(!req.user){
        return res.status(401).end();
    }
    if(req.user.role !== 'ADMIN'){
        return res.status(401).json({error: "Permission required"});
    }
    next();
});

module.exports = router