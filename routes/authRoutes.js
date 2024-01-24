const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Sign Up (Register) a new user
router.post('/signup', authController.createNewUser);

// Log In (Authenticate) a user
router.post('/login', authController.loginUser);

module.exports = router;
