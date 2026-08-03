// const mysql = require("mysql2");

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Root@123",
//     database: "cmr_medical"
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

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Root@123",
    database: process.env.DB_NAME || "cmr_medical"
});

db.connect((err) => {

    if (err) {
        console.log("MySQL Connection Failed");
        console.log(err);
    } else {
        console.log("MySQL Connected Successfully");
    }

});

module.exports = db;