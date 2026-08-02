const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI ||
            "mongodb://127.0.0.1:27017/medical_supplier_db"
        );

        console.log(
            "MongoDB Connected Successfully - Supplier Service"
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