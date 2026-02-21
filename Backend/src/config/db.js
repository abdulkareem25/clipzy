const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected...");
    } catch (err) {
        console.error("Database Error:", err.message);
    };
};

module.exports = connectDB;