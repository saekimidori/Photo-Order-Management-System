const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex) 
// router.get('/workspace', homeController.getWorkspace) 

module.exports = router