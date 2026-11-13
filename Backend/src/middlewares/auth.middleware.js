const jwt = require("jsonwebtoken");

const identifyUser = (req, res, next) => {

    const { accessToken } = req.cookies;

    if (!accessToken) {
        return res.status(401).json({
            message: "Authentication token is missing."
        });
    };

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const userId = decoded._id || decoded.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Invalid Token."
            });
        }

        req.user = { ...decoded, _id: userId };
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token.",
            error: err.message
        });
    };

    next();
};

module.exports = identifyUser;