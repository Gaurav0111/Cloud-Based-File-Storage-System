const path = require('path');
const fs = require('fs');
const { uploadFileToDropbox } = require('../dropboxService');

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const filePath = path.basename(req.file.path);
        const fileContent = fs.readFileSync(req.file.path);

        const dropboxResponse = await uploadFileToDropbox(filePath, fileContent);

        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: 'File uploaded successfully',
            dropboxResponse: dropboxResponse
        });
    } catch (error) {
        console.error('Error uploading file to Dropbox:', error);
        res.status(500).json({ error: 'Error uploading file to Dropbox' });
    }
};

module.exports = { uploadFile };
