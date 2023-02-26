const express = require('express')
const router = express.Router()
const workspaceController = require('../controllers/workspace')

router.get('/', workspaceController.getWorkspace)
router.get('/history', workspaceController.getHistory)
router.get('/search', workspaceController.search)
router.get('/customer/:id', workspaceController.getCustomer)
router.get('/:id', workspaceController.getEdit)

router.post('/newCustomer', workspaceController.newCustomer)

router.post('/addWorkspaceNote', workspaceController.addWorkspaceNote)
router.post('/markResolved/:id', workspaceController.markResolved)
router.post('/update/:id', workspaceController.updateNote)
router.get('/delete/:id', workspaceController.deleteNote)

// Retrieve a single Note with noteId
// router.get('/:id', workspaceController.findOne);

// Update a Note with noteId
// router.put('/:noteId/update', workspaceController.updateNote);


// router.put('/markIncomplete', workspaceController.markIncomplete)


module.exports = router