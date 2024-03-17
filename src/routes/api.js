const express = require('express');
const router = express.Router()
const userController = require("../controller/UserController")


// exemple start
router.post('/registraion', userController.Registraion)

// exemple end

module.exports = router