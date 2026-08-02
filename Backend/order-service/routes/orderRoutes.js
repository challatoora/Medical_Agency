const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");

// GET ALL ORDERS
router.get("/", orderController.getAllOrders);

// GET ORDER BY ID
router.get("/:id", orderController.getOrderById);

// CREATE ORDER
router.post("/", orderController.createOrder);

// UPDATE ORDER
router.put("/:id", orderController.updateOrder);

// DELETE ORDER
router.delete("/:id", orderController.deleteOrder);

module.exports = router;