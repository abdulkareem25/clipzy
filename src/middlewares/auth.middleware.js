const jwt = require("jsonwebtoken");


const identifyUser = (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message: "Token not found."
        });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token.",
            error: err.message
        });
    };

    next();
};

module.exports = identifyUser;