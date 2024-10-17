const express = require('express');
const { upload, uploadFile } = require('../controllers/uploadController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateUser, upload.single('file'), uploadFile);

module.exports = router;
