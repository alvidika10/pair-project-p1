const express = require('express')
const UserController = require('../controllers/userController')
const { isLoggedIn } = require('../middlewares/middleware')
const router = express.Router()

router.get('/',UserController.formRegister)
router.post('/',UserController.postRegister)
router.get('/login',UserController.formLogin)
router.post('/login',UserController.postLogin)



module.exports = router