const express = require('express');
const router = express.Router();

const { createOrder, getMyOrders,deleteOrder,allOrders, orderAction } = require('../controller/orderController');
const { verifyToken } = require('../middleware/verifyToken');
const { adminVerify } = require('../middleware/adminVerify');

router.route('/createorder').post(verifyToken,createOrder)
router.route('/myorders/:userid').get(verifyToken,getMyOrders)
router.route('/order/:id').delete(verifyToken,deleteOrder)

// ---- Admin Route ----
router.route('/admin/allorders/').get(verifyToken,adminVerify,allOrders)
router.route('/admin/order/:id').put(verifyToken,adminVerify,orderAction)


module.exports = router