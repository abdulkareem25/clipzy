const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

const uploadImage = async (buffer, userId) => {

    const result = await client.files.upload({
        file: buffer.toString('base64'),
        fileName: "image",
        folder: `clipzy/${userId}`
    });

    return result;
};

module.exports = uploadImage;