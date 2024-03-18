const express = require('express');
const router = express.Router()
const userController = require("../controller/UserController");
const AuthVerification = require('../middleware/AuthVerification');


// exemple start
router.post('/registraion', userController.Registraion)
router.get('/login', userController.Login)
router.post('/user-profile-update', AuthVerification, userController.UpdateProfile)

// exemple end

module.exports = router