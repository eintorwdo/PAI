const {body, validationResult} = require('express-validator');
const express = require('express')
let router = express.Router()

router.use([
    body('lotID').isMongoId().withMessage('Not a mongo id'),
    body('carID').isMongoId().withMessage('Not a mongo id'),
    body('planID').isMongoId().withMessage('Not a mongo id')
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    return next();
});

module.exports = router