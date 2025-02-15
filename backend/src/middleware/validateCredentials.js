const {body, validationResult} = require('express-validator');
const express = require('express')
let router = express.Router()

router.use([
    body('email').isEmail().withMessage('Incorrect email'),
    body('password').isLength({ min: 6 }).withMessage('Minimum length of 6 characters')
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    return next();
});

module.exports = router