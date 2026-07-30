// const db = require("../config/db");

// // Get All Inventory
// const getAllInventory = (callback) => {

//     const sql = `
//         SELECT *
//         FROM inventory
//         ORDER BY id DESC
//     `;

//     db.query(sql, callback);
// };


// // Get Inventory By ID
// const getInventoryById = (id, callback) => {

//     const sql = `
//         SELECT *
//         FROM inventory
//         WHERE id = ?
//     `;

//     db.query(sql, [id], callback);
// };


// // Add Inventory
// const createInventory = (inventory, callback) => {

//     const sql = `
//         INSERT INTO inventory
//         (
//             medicine_id,
//             supplier_id,
//             batch_number,
//             quantity,
//             purchase_price,
//             selling_price,
//             expiry_date,
//             stock_status
//         )
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [
//         inventory.medicine_id,
//         inventory.supplier_id,
//         inventory.batch_number,
//         inventory.quantity,
//         inventory.purchase_price,
//         inventory.selling_price,
//         inventory.expiry_date,
//         inventory.stock_status || "Available"
//     ];

//     db.query(sql, values, callback);
// };


// // Update Inventory
// const updateInventory = (id, inventory, callback) => {

//     const sql = `
//         UPDATE inventory
//         SET medicine_id = ?,
//             supplier_id = ?,
//             batch_number = ?,
//             quantity = ?,
//             purchase_price = ?,
//             selling_price = ?,
//             expiry_date = ?,
//             stock_status = ?
//         WHERE id = ?
//     `;

//     const values = [
//         inventory.medicine_id,
//         inventory.supplier_id,
//         inventory.batch_number,
//         inventory.quantity,
//         inventory.purchase_price,
//         inventory.selling_price,
//         inventory.expiry_date,
//         inventory.stock_status,
//         id
//     ];

//     db.query(sql, values, callback);
// };


// // Delete Inventory
// const deleteInventory = (id, callback) => {

//     const sql = `
//         DELETE FROM inventory
//         WHERE id = ?
//     `;

//     db.query(sql, [id], callback);
// };


// // Get Low Stock
// const getLowStock = (callback) => {

//     const sql = `
//         SELECT *
//         FROM inventory
//         WHERE quantity <= 10
//         AND quantity > 0
//     `;

//     db.query(sql, callback);
// };


// // Get Out of Stock
// const getOutOfStock = (callback) => {

//     const sql = `
//         SELECT *
//         FROM inventory
//         WHERE quantity = 0
//     `;

//     db.query(sql, callback);
// };


// // Get Expired Inventory
// const getExpiredInventory = (callback) => {

//     const sql = `
//         SELECT *
//         FROM inventory
//         WHERE expiry_date < CURDATE()
//     `;

//     db.query(sql, callback);
// };


// module.exports = {
//     getAllInventory,
//     getInventoryById,
//     createInventory,
//     updateInventory,
//     deleteInventory,
//     getLowStock,
//     getOutOfStock,
//     getExpiredInventory
// };

const { redisClient } = require("../config/redis");

const INVENTORY_KEY = "inventory";

// Get All Inventory
const getAllInventory = async (callback) => {
    try {
        const data = await redisClient.hGetAll(INVENTORY_KEY);

        const inventory = Object.values(data).map(item =>
            JSON.parse(item)
        );

        callback(null, inventory);
    } catch (error) {
        callback(error);
    }
};


// Get Inventory By ID
const getInventoryById = async (id, callback) => {
    try {
        const data = await redisClient.hGet(
            INVENTORY_KEY,
            id.toString()
        );

        if (!data) {
            return callback(null, null);
        }

        callback(null, JSON.parse(data));
    } catch (error) {
        callback(error);
    }
};


// Add Inventory
const createInventory = async (inventory, callback) => {
    try {
        const id = Date.now().toString();

        const newInventory = {
            id,
            medicine_id: inventory.medicine_id,
            supplier_id: inventory.supplier_id,
            batch_number: inventory.batch_number,
            quantity: inventory.quantity,
            purchase_price: inventory.purchase_price,
            selling_price: inventory.selling_price,
            expiry_date: inventory.expiry_date,
            stock_status: inventory.stock_status || "Available"
        };

        await redisClient.hSet(
            INVENTORY_KEY,
            id,
            JSON.stringify(newInventory)
        );

        callback(null, {
            message: "Inventory created successfully",
            inventory: newInventory
        });
    } catch (error) {
        callback(error);
    }
};


// Update Inventory
const updateInventory = async (id, inventory, callback) => {
    try {
        const existing = await redisClient.hGet(
            INVENTORY_KEY,
            id.toString()
        );

        if (!existing) {
            return callback(null, null);
        }

        const updatedInventory = {
            ...JSON.parse(existing),
            medicine_id: inventory.medicine_id,
            supplier_id: inventory.supplier_id,
            batch_number: inventory.batch_number,
            quantity: inventory.quantity,
            purchase_price: inventory.purchase_price,
            selling_price: inventory.selling_price,
            expiry_date: inventory.expiry_date,
            stock_status: inventory.stock_status
        };

        await redisClient.hSet(
            INVENTORY_KEY,
            id.toString(),
            JSON.stringify(updatedInventory)
        );

        callback(null, updatedInventory);
    } catch (error) {
        callback(error);
    }
};


// Delete Inventory
const deleteInventory = async (id, callback) => {
    try {
        const deleted = await redisClient.hDel(
            INVENTORY_KEY,
            id.toString()
        );

        callback(null, {
            message: deleted
                ? "Inventory deleted successfully"
                : "Inventory not found"
        });
    } catch (error) {
        callback(error);
    }
};


// Get Low Stock
const getLowStock = async (callback) => {
    try {
        const data = await redisClient.hGetAll(INVENTORY_KEY);

        const inventory = Object.values(data)
            .map(item => JSON.parse(item))
            .filter(item =>
                Number(item.quantity) <= 10 &&
                Number(item.quantity) > 0
            );

        callback(null, inventory);
    } catch (error) {
        callback(error);
    }
};


// Get Out of Stock
const getOutOfStock = async (callback) => {
    try {
        const data = await redisClient.hGetAll(INVENTORY_KEY);

        const inventory = Object.values(data)
            .map(item => JSON.parse(item))
            .filter(item =>
                Number(item.quantity) === 0
            );

        callback(null, inventory);
    } catch (error) {
        callback(error);
    }
};


// Get Expired Inventory
const getExpiredInventory = async (callback) => {
    try {
        const data = await redisClient.hGetAll(INVENTORY_KEY);

        const today = new Date();

        const inventory = Object.values(data)
            .map(item => JSON.parse(item))
            .filter(item =>
                new Date(item.expiry_date) < today
            );

        callback(null, inventory);
    } catch (error) {
        callback(error);
    }
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
```
