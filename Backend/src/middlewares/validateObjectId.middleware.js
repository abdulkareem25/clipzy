const mongoose = require('mongoose');

function validateObjectId(paramName = 'id') {
    return function (req, res, next) {

        const value = req.params[paramName];

        if (!value || !mongoose.isValidObjectId(value)) {
            return res.status(400).json({
                message: `Invalid ${paramName}.`
            });
        };

        next();
    };
};


module.exports = validateObjectId;