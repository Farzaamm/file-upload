const {body, check, validationResult} = require('express-validator');

module.exports = {
    validateSignup: [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required'),
        body('confirmPassword').notEmpty().withMessage('Confirm Password is required')
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true;
            })
    ],
    validateLogin: [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required') 
    ],
    
    validateUpload: [
        check('file').custom((value, {req}) => {
            if (!req.file) {
                throw new Error('File is required');
            }
            return true;
        })
    ],
    handleValidationErrors: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
};