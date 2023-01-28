const express = require('express')
const router = express.Router()
const workspaceController = require('../controllers/workspace')

router.get('/', workspaceController.getWorkspace)

router.post('/addWorkspaceNote', workspaceController.addWorkspaceNote)

// router.put('/markComplete', workspaceController.markComplete)

// router.put('/markIncomplete', workspaceController.markIncomplete)

// router.delete('/deleteNote', workspaceController.deleteNote)

module.exports = router