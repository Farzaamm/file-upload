const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.showUserProfile);
router.post('/folders', userController.createFolder);
router.get('/:user/:folderName', userController.showFolder);

module.exports = router;