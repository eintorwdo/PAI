const {body, validationResult} = require('express-validator');
const express = require('express')
let router = express.Router()

router.use([
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('role').custom((value) => {
        if(!['ADMIN', 'REGULAR'].includes(value)){
            throw new Error('Invalid role parameter in request body');
        }
        return true;
    })
],(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    return next();
});

module.exports = router