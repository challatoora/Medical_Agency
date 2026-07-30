// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// connection.connect((err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("MySQL Connected");
//     }
// });

// module.exports = connection;


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