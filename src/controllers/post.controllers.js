const uploadImage = require("../services/storage.service");

const createPost = async (req, res) => {
    const { buffer } = req.file;
    const { caption } = req.body;

    const result = await uploadImage(buffer);

    
};

module.exports = { createPost }