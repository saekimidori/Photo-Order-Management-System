const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customer')

router.get('/:id', customerController.getCustomer)
router.get('/:id/edit', customerController.getCustomerEdit)
router.post('/newCustomer', customerController.newCustomer)
router.post('/update/:id', customerController.updateCustomer)

module.exports = router