const Dropbox = require('dropbox').Dropbox;
const fetch = require('isomorphic-fetch');

const dbx = new Dropbox({ accessToken: 'sl.B7ieH2iRqBEbwEC9jIK5K5szWFSr0ZNo-LTDc2xyOVQeSBb3ny2fF5zDzg-Sxn2lTHB_FCEXOFmCjMOU3Sqq8VTEN-rgSr-_HU02MqB9A3qdoYycPSzOvMbN-DDskKc_Xxl0_Qm0a3T6', fetch: fetch });

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
