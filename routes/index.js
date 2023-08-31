const express = require('express')
const UserController = require('../controllers/userController')
const { isLoggedIn } = require('../middlewares/middleware')
const router = express.Router()
router.use(require('./register-login'))
router.use(require('./admin'))
router.use(require('./user'))
router.get('/' ,isLoggedIn ,UserController.home)

module.exports = router