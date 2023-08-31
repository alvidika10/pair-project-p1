const express = require('express')
const { isLoggedIn } = require('../middlewares/middleware')
const AdminController = require('../controllers/adminController')
const router = express.Router()

router.get('/admin', AdminController.admin)
router.get('/admin/:RestaurantId/addMenu', AdminController.addMenuForm)
router.post('/admin/:RestaurantId/addMenu', AdminController.addMenuProcess)

module.exports = router