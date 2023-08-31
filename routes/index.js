const express = require('express')
const UserController = require('../controllers/userController')
const { isLoggedIn } = require('../middlewares/middleware')
const router = express.Router()
router.use(require('./register-login'))
router.use(isLoggedIn)


router.use(require('./user'))


module.exports = router