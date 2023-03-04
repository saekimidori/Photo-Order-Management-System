const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customer')

// router.get('/', customerController.getCustomer)
router.get('/edit/:id', customerController.getCustomerEdit)
router.get('/:id', customerController.getCustomer)

router.post('/newCustomer', customerController.newCustomer)
router.post('/update/:id', customerController.updateCustomer)

module.exports = router