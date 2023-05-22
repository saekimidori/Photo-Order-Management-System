const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order')

// gets order details
router.get('/:id', orderController.getOrder)
// gets new order page
router.get('/:id/newOrder', orderController.newOrder)
// submits new order
router.post('/:id/submitOrder', orderController.submitOrder)
router.post('/markDone/:id', orderController.markDone)

module.exports = router