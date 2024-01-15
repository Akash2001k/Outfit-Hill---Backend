const express = require('express');
const router = express.Router()

const { contact,contactList, deleteContact } = require('../controller/contactController');
const { verifyToken } = require('../middleware/verifyToken');
const { adminVerify } = require('../middleware/adminVerify');

router.route('/contact').post(contact)

router.route('/admin/allcontact').get(verifyToken,adminVerify,contactList)
router.route('/admin/contact/:id').delete(verifyToken,adminVerify,deleteContact)

module.exports = router
