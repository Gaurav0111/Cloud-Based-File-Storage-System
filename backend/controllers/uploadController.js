const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!req.user || !req.user.email) {
      return cb(new Error('User information not provided'), false);
    }
    cb(null, 'uploads/');  // Replace with your desired upload directory
  },
  filename: function (req, file, cb) {
    cb(null, req.user.email + '-' + Date.now() + path.extname(file.originalname));  // Use email in the filename
  }
});

const upload = multer({ storage: storage });

const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { upload, uploadFile };
