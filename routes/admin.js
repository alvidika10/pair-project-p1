const express = require('express')
const { isLoggedIn } = require('../middlewares/middleware')
const AdminController = require('../controllers/adminController')
const router = express.Router()

router.get('/admin', AdminController.admin)
router.get('/admin/addMenu', AdminController.addMenuForm)
router.post('/admin/addMenu', AdminController.addMenuProcess)
router.get('/admin/:MenuId/editMenu', AdminController.editMenuForm)
router.post('/admin/:MenuId/editMenu', AdminController.editMenuProcess)
router.get('/admin/:MenuId/delete', AdminController.deleteMenu)
module.exports = router