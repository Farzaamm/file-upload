const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateSignup, validateLogin, handleValidationErrors } = require('../middlewares/validator');

// show forms
router.get('/signup', authController.renderSignupForm);
router.get('/login', authController.renderLoginForm);

// process forms
router.post('/signup', validateSignup, handleValidationErrors, authController.handleSignup);
router.post('/login', validateLogin, handleValidationErrors, authController.handleLogin);

// Logout
router.post('/logout', authController.handleLogout);

module.exports = router;