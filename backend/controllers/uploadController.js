const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadFileToDropbox } = require('../dropboxService');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!req.user || !req.user.email) {
            return cb(new Error('User information not provided'));
        }

        const userFolder = path.join('uploads', req.user.email);  // Create a folder with user's email
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });  // Create folder if it doesn't exist
        }
        cb(null, userFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const userFolder = path.join('uploads', req.user.email);
        const filePath = path.join(userFolder, req.file.filename);
        const fileContent = fs.readFileSync(filePath);

        // Upload file to Dropbox using user's email in the path
        const response = await uploadFileToDropbox(`${req.user.email}/${req.file.originalname}`, fileContent);

        fs.unlinkSync(filePath);  // Delete the local file after upload

        res.status(200).json({ message: 'File uploaded successfully to Dropbox', response });
    } catch (error) {
        console.error('Error uploading file to Dropbox:', error);
        res.status(500).json({ error: 'Failed to upload file to Dropbox' });
    }
};

module.exports = { upload, uploadFile };
