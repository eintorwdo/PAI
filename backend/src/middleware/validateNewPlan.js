const {body, validationResult} = require('express-validator');
const express = require('express')
let router = express.Router()

router.use([
    body('duration').isNumeric().custom(value => value >= 1),
    body('cost').isNumeric().custom(value => value >= 0)
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    return next();
});

module.exports = router