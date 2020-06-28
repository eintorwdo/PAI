const {body, validationResult} = require('express-validator');
const express = require('express')
let router = express.Router()

router.use([
    body('make').isLength({ min: 3, max: 20 }).withMessage('Minimum length of 3 and maximum of 20'),
    body('model').isLength({ min: 1, max: 20 }).withMessage('Minimum length of 1 and maximum of 20'),
    body('regNumber').isLength({ min: 4, max: 11 }).withMessage('Minimum length of 4 and maximum of 11')
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    return next();
});

module.exports = router