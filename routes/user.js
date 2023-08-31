const express = require('express')
const UserController = require('../controllers/userController')
const { isLoggedIn, isUser } = require('../middlewares/middleware')
const router = express.Router()


router.get('/user',isUser, UserController.user)

router.get('/user/menu',isUser, UserController.menu)

router.get('/user/menu/:MenuId/buy',isUser, UserController.order)
// router.post('/user/menu/:MenuId/buy',isUser, UserController.orderProcess) // aslinya untuk fitur beli tp diganti proses csvjs

module.exports = router