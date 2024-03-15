const express = require('express');
const userController = require("../controller/UserController")

const router = express.Router()
// exemple start
router.post('/createUser', userController.createUser)

module.exports = router
// exemple end
