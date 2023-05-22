const express = require('express')
const router = express.Router()
const noteController = require('../controllers/note')

// gets notes history. needs to be first to work
router.get('/history', noteController.getHistory)
router.post('/addWorkspaceNote', noteController.addWorkspaceNote)
router.get('/:id', noteController.getEdit)
router.post('/markResolved/:id', noteController.markResolved)
router.post('/update/:id', noteController.updateNote)
router.get('/delete/:id', noteController.deleteNote)


router.post('/addOrderNote', noteController.addOrderNote)

module.exports = router