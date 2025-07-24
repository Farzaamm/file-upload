const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const passport = require('passport');

// show forms
router.get('/signup', authController.renderSignupForm);
router.get('/login', authController.renderLoginForm);

// process forms
router.post('/signup', authController.handleSignup);
router.post('/login', authController.handleLogin);

// Logout
router.post('/logout', authController.handleLogout);

module.exports = router;