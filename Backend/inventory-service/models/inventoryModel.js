const db = require("../config/db");

// Get All Inventory
const getAllInventory = (callback) => {

    const sql = `
        SELECT *
        FROM inventory
        ORDER BY id DESC
    `;

    db.query(sql, callback);
};


// Get Inventory By ID
const getInventoryById = (id, callback) => {

    const sql = `
        SELECT *
        FROM inventory
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};


// Add Inventory
const createInventory = (inventory, callback) => {

    const sql = `
        INSERT INTO inventory
        (
            medicine_id,
            supplier_id,
            batch_number,
            quantity,
            purchase_price,
            selling_price,
            expiry_date,
            stock_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        inventory.medicine_id,
        inventory.supplier_id,
        inventory.batch_number,
        inventory.quantity,
        inventory.purchase_price,
        inventory.selling_price,
        inventory.expiry_date,
        inventory.stock_status || "Available"
    ];

    db.query(sql, values, callback);
};


// Update Inventory
const updateInventory = (id, inventory, callback) => {

    const sql = `
        UPDATE inventory
        SET medicine_id = ?,
            supplier_id = ?,
            batch_number = ?,
            quantity = ?,
            purchase_price = ?,
            selling_price = ?,
            expiry_date = ?,
            stock_status = ?
        WHERE id = ?
    `;

    const values = [
        inventory.medicine_id,
        inventory.supplier_id,
        inventory.batch_number,
        inventory.quantity,
        inventory.purchase_price,
        inventory.selling_price,
        inventory.expiry_date,
        inventory.stock_status,
        id
    ];

    db.query(sql, values, callback);
};


// Delete Inventory
const deleteInventory = (id, callback) => {

    const sql = `
        DELETE FROM inventory
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};


// Get Low Stock
const getLowStock = (callback) => {

    const sql = `
        SELECT *
        FROM inventory
        WHERE quantity <= 10
        AND quantity > 0
    `;

    db.query(sql, callback);
};


// Get Out of Stock
const getOutOfStock = (callback) => {

    const sql = `
        SELECT *
        FROM inventory
        WHERE quantity = 0
    `;

    db.query(sql, callback);
};


// Get Expired Inventory
const getExpiredInventory = (callback) => {

    const sql = `
        SELECT *
        FROM inventory
        WHERE expiry_date < CURDATE()
    `;

    db.query(sql, callback);
};


module.exports = {
    getAllInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory,
    getLowStock,
    getOutOfStock,
    getExpiredInventory
};