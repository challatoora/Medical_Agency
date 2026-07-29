const express = require("express");

const router = express.Router();

const billingController =
    require("../controllers/billingController");


// Get All Invoices
router.get(
    "/",
    billingController.getAllInvoices
);


// Get Invoice By ID
router.get(
    "/:id",
    billingController.getInvoiceById
);


// Create Invoice
router.post(
    "/",
    billingController.createInvoice
);


// Update Payment Status
router.put(
    "/:id/payment-status",
    billingController.updatePaymentStatus
);


// Update Payment Method
router.put(
    "/:id/payment-method",
    billingController.updatePaymentMethod
);


// Cancel Invoice
router.put(
    "/:id/cancel",
    billingController.cancelInvoice
);


// Delete Invoice
router.delete(
    "/:id",
    billingController.deleteInvoice
);


module.exports = router;