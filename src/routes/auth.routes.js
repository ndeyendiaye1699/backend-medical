const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
// Routes Auth
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users',  authController.getAllUsers);
router.get('/doctors', authController.getAllDoctors);

module.exports = router;
