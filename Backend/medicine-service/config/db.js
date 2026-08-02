const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoURI =
            process.env.MONGO_URI ||
            "mongodb://127.0.0.1:27017/medical_medicine_db";

        await mongoose.connect(mongoURI);

        console.log(
            "MongoDB Connected Successfully - Medicine Service"
        );
    } catch (error) {
        console.error(
            "MongoDB Connection Failed:",
            error.message
        );

        process.exit(1);
    }
};

module.exports = connectDB;