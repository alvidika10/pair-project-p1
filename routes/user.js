const express = require('express')
const UserController = require('../controllers/userController')
const { isLoggedIn } = require('../middlewares/middleware')
const router = express.Router()


router.get('/user', UserController.user)

router.get('/user/restaurant', UserController.restaurant)


module.exports = router