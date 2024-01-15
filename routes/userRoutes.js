const express = require('express');
const router = express.Router()

const { registerUser, loginUser, getUsers,authController, getUserById } = require('../controller/userController');
const { verifyToken } = require('../middleware/verifyToken');
const { adminVerify } = require('../middleware/adminVerify');

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)
router.route('/auth/user').get(verifyToken,authController)

router.route('/admin/allusers').get(verifyToken,adminVerify,getUsers)
router.route('/admin/user/:id').get(verifyToken,adminVerify,getUserById)

module.exports = router