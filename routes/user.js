const express = require('express')
const UserController = require('../controllers/userController')
const { isLoggedIn } = require('../middlewares/middleware')
const router = express.Router()


router.get('/user', UserController.user)

router.get('/user/menu', UserController.menu)

router.get('/user/menu/buy', UserController.buy)

module.exports = router