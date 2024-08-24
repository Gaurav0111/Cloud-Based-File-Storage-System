const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadFileToDropbox } = require('../dropboxService');


// Configure multer for local storage (this is still needed to handle file uploads before sending them to Dropbox)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Temporary storage before uploading to Dropbox
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// File upload route
const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const filePath = path.join(__dirname, '../uploads', req.file.filename);
        const fileContent = fs.readFileSync(filePath);

        // Upload the file to Dropbox
        const response = await uploadFileToDropbox(req.file.originalname, fileContent);

        // Remove the file from the local directory after uploading
        fs.unlinkSync(filePath);

        res.status(200).json({ message: 'File uploaded successfully to Dropbox', response });
    } catch (error) {
        console.error('Error uploading file to Dropbox:', error);
        res.status(500).json({ error: 'Failed to upload file to Dropbox' });
    }
};


module.exports = { upload, uploadFile };
