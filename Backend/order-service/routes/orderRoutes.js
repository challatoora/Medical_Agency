const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");


// Get All Orders
router.get("/", orderController.getAllOrders);


// Get Order By ID
router.get("/:id", orderController.getOrderById);


// Create Order
router.post("/", orderController.createOrder);


// Update Order Status
router.put("/:id/status", orderController.updateOrderStatus);


// Delete Order
router.delete("/:id", orderController.deleteOrder);


module.exports = router;