const express = require('express');
const router = express.Router()
const userController = require("../controller/UserController");
const TodoController = require("../controller/TodoController");
const AuthVerification = require('../middleware/AuthVerification');


// user api rout  start
router.post('/registraion', userController.Registraion)
router.get('/login', userController.Login)
router.post('/user-profile-update', AuthVerification, userController.UpdateProfile)

// user api rout  end
// todo api routes start
router.post('/create-todo', AuthVerification, TodoController.CreateTodo)
// todo api routes end

module.exports = router