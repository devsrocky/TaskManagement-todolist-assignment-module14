const express = require("express")
const router = express.Router();

// IMPORT CONTROLLERS
const usersController = require('../controller/usersController')
const todoController = require('../controller/todoController')
const authVerifyController = require('../middleware/authVerify')


// PATH SPECIFIED || for users
router.post('/registration', usersController.registration)
router.get('/login', usersController.login)


// LOGED IN USERS PATH SPECFIED || for users
router.get('/readProfile', authVerifyController, usersController.readProfile)
router.post('/updateProfile',authVerifyController, usersController.updateProfile)


// TODO LIST BACKEND PATH SPECIFIED || for users
router.post('/createTodo',authVerifyController, todoController.create)
router.get('/readTodo',authVerifyController, todoController.readTodo)
router.post('/updateTodo/:id',authVerifyController, todoController.updateTodo)
router.get('/removeTodo/:id',authVerifyController, todoController.deleteTodo)

router.post('/statusMark/:id',authVerifyController, todoController.statusMark)


// EXPORT ROUTER
module.exports = router;