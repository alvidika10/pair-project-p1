const express = require('express')
const UserController = require('../controllers/userController')
const { isLoggedIn } = require('../middlewares/middleware')
const router = express.Router()