const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller')

router.get('/login', authController.login);
router.get('/signup', authController.signup);
router.get('/logout', authController.logout)
router.post('/users/signup', authController.createUser);
router.post('/users/login', authController.loginUser); 

module.exports = router;   