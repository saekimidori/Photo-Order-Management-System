const express = require('express')
const router = express.Router()
const workspaceController = require('../controllers/workspace')

router.get('/', workspaceController.getWorkspace)
router.get('/search', workspaceController.search)

// create a new product
router.post('/newProduct', workspaceController.newProduct)

module.exports = router