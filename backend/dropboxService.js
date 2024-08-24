require('dotenv').config();
const { Dropbox } = require('dropbox');
const fetch = require('node-fetch');
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

const uploadFileToDropbox = async (fileName, fileContent) => {
    try {
        const response = await dbx.filesUpload({
            path: '/' + fileName,
            contents: fileContent
        });
        return response.result;
    } catch (error) {
        console.error('Error uploading file to Dropbox:', error);
        throw error;
    }
};

module.exports = { uploadFileToDropbox };
