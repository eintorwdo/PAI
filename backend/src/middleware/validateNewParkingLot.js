const {body, validationResult} = require('express-validator');
const express = require('express')
let router = express.Router()

router.use([
    body('city').isLength({min: 2, max: 30}),
    body('address').isLength({min: 8, max: 50}),
    body('numberOfSpaces').isNumeric().custom(value => value >= 0)
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    return next();
});

module.exports = router