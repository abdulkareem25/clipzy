const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

const uploadImage = async (buffer) => {

    const result = await client.files.upload({
        file: buffer.toString('base64'),
        fileName: "image"
    });

    return result;
};

module.exports = uploadImage;