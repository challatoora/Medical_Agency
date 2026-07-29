const express = require("express");

const router = express.Router();

const inventoryController = require("../controllers/inventoryController");


// Get all inventory
router.get("/", inventoryController.getAllInventory);


// Low stock
router.get("/low-stock", inventoryController.getLowStock);


// Out of stock
router.get("/out-of-stock", inventoryController.getOutOfStock);


// Expired stock
router.get("/expired", inventoryController.getExpiredInventory);


// Get inventory by ID
router.get("/:id", inventoryController.getInventoryById);


// Create inventory
router.post("/", inventoryController.createInventory);


// Update inventory
router.put("/:id", inventoryController.updateInventory);


// Delete inventory
router.delete("/:id", inventoryController.deleteInventory);


module.exports = router;