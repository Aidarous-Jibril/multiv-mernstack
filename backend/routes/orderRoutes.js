const express = require('express')
const router = express.Router()
const { createOrder, getUserOrders, getStoreOrders, getSingleOrder, updateOrderStatusByStore, refundOrder, refundAcceptedByStore } = require('../controllers/orderController')
const { isSeller } = require('../middleware/authMiddleware')





router.get('/get-user-orders/:userId', getUserOrders)
router.get('/get-store-orders/:storeId', getStoreOrders)
router.get('/:orderId', getSingleOrder)
router.post('/create-order', createOrder)
router.put('/update-order-status/:orderId', updateOrderStatusByStore)
router.put('/request-order-refund/:orderId', refundOrder)
router.put('/accept-order-refund/:orderId', isSeller, refundAcceptedByStore)


module.exports = router