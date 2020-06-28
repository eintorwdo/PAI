const {body, validationResult} = require('express-validator');
const express = require('express')
let router = express.Router()

router.use([
    body('duration').isInt({min: 1}).withMessage('Must be a positive int'),
    body('cost').isNumeric().custom(value => value >= 0).withMessage('Must be a positive number')
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    return next();
});

module.exports = router