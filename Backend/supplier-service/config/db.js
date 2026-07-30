// const mysql = require("mysql2");

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Root@123",   // Change to your MySQL password
//     database: "cmr_medical"
// });

// db.connect((err) => {
//     if (err) {
//         console.log("Database Connection Failed");
//         console.log(err);
//     } else {
//         console.log("MySQL Connected Successfully");
//     }
// });

// module.exports = db;

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