const express = require('express')
const router = express.Router()
const workspaceController = require('../controllers/workspace')

router.get('/', workspaceController.getWorkspace)
router.get('/:id', workspaceController.getEdit)
router.get('/history', workspaceController.getHistory)

router.get('/search', workspaceController.search)

router.post('/addWorkspaceNote', workspaceController.addWorkspaceNote)

router.post('/markResolved/:id', workspaceController.markResolved)

// Retrieve a single Note with noteId
// router.get('/:id', workspaceController.findOne);

// Update a Note with noteId
// router.put('/:noteId/update', workspaceController.updateNote);

router.post('/update/:id', workspaceController.updateNote)

// router.put('/markIncomplete', workspaceController.markIncomplete)

router.get('/delete/:id', workspaceController.deleteNote)

module.exports = router