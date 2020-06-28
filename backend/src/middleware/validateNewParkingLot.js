const {body, validationResult} = require('express-validator');
const express = require('express')
let router = express.Router()

router.use([
    body('city').isLength({min: 2, max: 30}).withMessage('Minimum length of 2 and maximum of 30'),
    body('address').isLength({min: 8, max: 50}).withMessage('Minimum length of 8 and maximum of 50'),
    body('numberOfSpaces').isInt({min: 1}).withMessage('Must be a positive int')
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    return next();
});

module.exports = router