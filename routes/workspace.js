const express = require('express')
const router = express.Router()
const workspaceController = require('../controllers/workspace')

router.get('/', workspaceController.getWorkspace)

router.get('/search', workspaceController.search)

router.post('/addWorkspaceNote', workspaceController.addWorkspaceNote)

router.put('/markResolved', workspaceController.markResolved)

// Retrieve a single Note with noteId
// router.get('/:noteId', workspaceController.findOne);

// Update a Note with noteId
router.put('/:noteId/update', workspaceController.updateNote);

// router.put('/updateNote/:id', workspaceController.updateNote)

// router.put('/markIncomplete', workspaceController.markIncomplete)

router.delete('/deleteNote', workspaceController.deleteNote)

module.exports = router