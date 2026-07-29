const db = require("../config/db");

const getAllSuppliers = (callback) => {
    db.query("SELECT * FROM suppliers", callback);
};

module.exports = {
    getAllSuppliers
};