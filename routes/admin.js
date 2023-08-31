const express = require('express')
const { isLoggedIn, isAdmin } = require('../middlewares/middleware')
const AdminController = require('../controllers/adminController')
const router = express.Router()

router.get('/admin',isAdmin, isLoggedIn, AdminController.admin)
router.get('/admin/addMenu',isAdmin,isLoggedIn, AdminController.addMenuForm)
router.post('/admin/addMenu',isAdmin,isLoggedIn, AdminController.addMenuProcess)
router.get('/admin/:MenuId/editMenu',isAdmin,isLoggedIn, AdminController.editMenuForm)
router.post('/admin/:MenuId/editMenu',isAdmin,isLoggedIn, AdminController.editMenuProcess)
router.get('/admin/:MenuId/delete',isAdmin,isLoggedIn, AdminController.deleteMenu)
module.exports = router