require('dotenv').config();
const Dropbox = require('dropbox').Dropbox;
const fetch = require('isomorphic-fetch');

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN, fetch: fetch });

const uploadFileToDropbox = async (filePath, fileContent) => {
    try {
        const response = await dbx.filesUpload({
            path: `/${filePath}`,
            contents: fileContent
        });
        return response;
    } catch (error) {
        console.error('Error uploading file to Dropbox:', error);
        throw error;
    }
};

module.exports = { uploadFileToDropbox };
