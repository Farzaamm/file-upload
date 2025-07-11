const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const passport = require('passport');

// show forms
router.get('/signup', (req, res) => {
    res.render('auth/signup', { title: 'Sign up' });
})
router.get('/signup', authController.signup);
router.get('/login', authController.login);

// process forms
router.post('/signup', authController.signupPost);
router.post('/login', authController.loginPost);
router.post('/logout', authController.logout);

module.exports = router;