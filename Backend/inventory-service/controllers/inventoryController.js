const inventoryModel = require("../models/inventoryModel");


// Get All Inventory
const getAllInventory = (req, res) => {

    inventoryModel.getAllInventory((err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch inventory"
            });
        }

        res.status(200).json(results);

    });

};


// Get Inventory By ID
const getInventoryById = (req, res) => {

    const { id } = req.params;

    inventoryModel.getInventoryById(id, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch inventory"
            });
        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "Inventory not found"
            });

        }

        res.status(200).json(results[0]);

    });

};


// Create Inventory
const createInventory = (req, res) => {

    const inventory = req.body;

    if (
        !inventory.medicine_id ||
        !inventory.supplier_id ||
        !inventory.batch_number ||
        inventory.quantity === undefined ||
        !inventory.purchase_price ||
        !inventory.selling_price ||
        !inventory.expiry_date
    ) {

        return res.status(400).json({
            message: "Required inventory fields are missing"
        });

    }

    inventoryModel.createInventory(inventory, (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to create inventory"
            });
        }

        res.status(201).json({
            message: "Inventory created successfully",
            inventoryId: result.insertId
        });

    });

};


// Update Inventory
const updateInventory = (req, res) => {

    const { id } = req.params;

    const inventory = req.body;

    inventoryModel.updateInventory(id, inventory, (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to update inventory"
            });
        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Inventory not found"
            });

        }

        res.status(200).json({
            message: "Inventory updated successfully"
        });

    });

};


// Delete Inventory
const deleteInventory = (req, res) => {

    const { id } = req.params;

    inventoryModel.deleteInventory(id, (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to delete inventory"
            });
        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Inventory not found"
            });

        }

        res.status(200).json({
            message: "Inventory deleted successfully"
        });

    });

};


// Get Low Stock
const getLowStock = (req, res) => {

    inventoryModel.getLowStock((err, results) => {

        if (err) {

            return res.status(500).json({
                message: "Failed to fetch low stock inventory"
            });

        }

        res.status(200).json(results);

    });

};


// Get Out of Stock
const getOutOfStock = (req, res) => {

    inventoryModel.getOutOfStock((err, results) => {

        if (err) {

            return res.status(500).json({
                message: "Failed to fetch out of stock inventory"
            });

        }

        res.status(200).json(results);

    });

};


// Get Expired Inventory
const getExpiredInventory = (req, res) => {

    inventoryModel.getExpiredInventory((err, results) => {

        if (err) {

            return res.status(500).json({
                message: "Failed to fetch expired inventory"
            });

        }

        res.status(200).json(results);

    });

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