const express = require('express')
const router = express.Router()
const workspaceController = require('../controllers/workspace')

router.get('/', workspaceController.getWorkspace)
router.get('/history', workspaceController.getHistory)
router.get('/search', workspaceController.search)
router.get('/:id', workspaceController.getEdit)

router.post('/addWorkspaceNote', workspaceController.addWorkspaceNote)
router.post('/markResolved/:id', workspaceController.markResolved)
router.post('/update/:id', workspaceController.updateNote)
router.get('/delete/:id', workspaceController.deleteNote)

// customer routes
// ideally, this should not be here
router.get('/customer/:id', workspaceController.getCustomer)
router.get('/customer/:id/edit', workspaceController.getCustomerEdit)
router.post('/newCustomer', workspaceController.newCustomer)
router.post('/customer/update/:id', workspaceController.updateCustomer)
router.get('/customer/:id/newOrder', workspaceController.newOrder)
router.post('/customer/:id/submitOrder', workspaceController.submitOrder)
router.get('/customer/:id/getOrder', workspaceController.getOrder)

// create a new product
router.post('/newProduct', workspaceController.newProduct)

module.exports = router