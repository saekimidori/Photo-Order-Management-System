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

router.get('/customer/:id', workspaceController.getCustomer)

module.exports = router