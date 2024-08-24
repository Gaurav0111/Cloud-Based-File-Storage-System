require('dotenv').config();
const Dropbox = require('dropbox').Dropbox;
const fetch = require('isomorphic-fetch');

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN, fetch: fetch });
// const dbx = new Dropbox({ accessToken: 'sl.B7kIZIgD1kSCqCpc2lBPwTnt52e8Zw233tzXSZQR71UHn2CjS8STn8495JLSujgn1ls23B_d8vhQBxF2ZvNFFf-b0ZJMyibp3FLnKCll5-Fc4fOVaKpNBdyQxubRsov2YLLSmATgfsD3', fetch: fetch });

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
