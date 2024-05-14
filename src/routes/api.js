const express = require('express');
const router = express.Router()
const userController = require("../controller/UserController");
const TodoController = require("../controller/TodoController");
const AuthVerification = require('../middleware/AuthVerification');

// user api rout  start
router.post('/registraion', userController.Registraion)
router.post('/login', userController.Login)
router.post('/user-profile-update', AuthVerification, userController.UpdateProfile)
router.get('/user-profile-details', AuthVerification, userController.ProfileDetails)
router.get('/email-verifiy/:email',  userController.EmailVerification)
router.get('/otp-verifiy/:email/:opt', userController.OtpVerifiy)
router.post('/reset-password', userController.ResetPassword)

// user api rout  end
// todo api routes start
router.post('/create-todo', AuthVerification, TodoController.CreateTodo)
router.get('/update-todo-status/:id/:status/:title', AuthVerification, TodoController.UpdateTodo)
router.get('/delete-todo/:id' , AuthVerification, TodoController.DeleteTodo)
router.get('/todo-list-by-status/:status', AuthVerification, TodoController.TodoListByStatus)
router.get('/todo-count-by-status', AuthVerification, TodoController.TodoCountByStatus)
// todo api routes end

module.exports = router