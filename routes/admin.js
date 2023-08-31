const express = require('express')
const { isLoggedIn } = require('../middlewares/middleware')
const AdminController = require('../controllers/adminController')
const router = express.Router()

router.get('/admin', AdminController.admin)


module.exports = router