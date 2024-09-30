// const express = require('express');
// const { upload, uploadFile } = require('../controllers/uploadController');
// const router = express.Router();

// router.post('/', upload.single('file'), uploadFile);

// module.exports = router;

const express = require('express');
const { upload, uploadFile } = require('../controllers/uploadController');
const verifyToken = require('../middleware/verifyToken'); // Adjust the path

const router = express.Router();

// Route for uploading files
router.post('/', verifyToken, upload.single('file'), uploadFile);

module.exports = router;
