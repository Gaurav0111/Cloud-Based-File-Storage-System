const express = require('express');
const { upload, uploadFile } = require('../controllers/uploadController');
const router = express.Router();

// Use the correct endpoint if you want /api/upload/file
router.post('/file', upload.single('file'), uploadFile);

module.exports = router;
