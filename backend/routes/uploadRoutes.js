const express = require('express');
const { upload, uploadFile } = require('../controllers/uploadController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importing the auth middleware

const router = express.Router();

router.post('/', authMiddleware, upload.single('file'), uploadFile); // Add authMiddleware before the upload

module.exports = router;
