// const mysql = require("mysql2");

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Root@123",
//     database: "billing_db"
// });

// db.connect((err) => {

//     if (err) {
//         console.log("MySQL Connection Failed");
//         console.log(err);
//     } else {
//         console.log("MySQL Connected Successfully");
//     }

// });

// module.exports = db;



// const mysql = require("mysql2");

// const db = mysql.createConnection({
//     host: process.env.DB_HOST || "localhost",
//     user: process.env.DB_USER || "root",
//     password: process.env.DB_PASSWORD || "Root@123",
//     database: process.env.DB_NAME || "billing_db"
// });

// db.connect((err) => {

//     if (err) {
//         console.log("MySQL Connection Failed");
//         console.log(err);
//     } else {
//         console.log("MySQL Connected Successfully");
//     }

// });

// module.exports = db;


const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Root@123",
    database: process.env.DB_NAME || "billing_db",
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test MySQL connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("MySQL Connection Failed");
        console.error(err);
    } else {
        console.log("MySQL Connected Successfully");
        connection.release();
    }
});

module.exports = db;