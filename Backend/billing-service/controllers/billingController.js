const billingModel = require("../models/billingModel");


// Get All Invoices
const getAllInvoices = (req, res) => {

    billingModel.getAllInvoices((err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch invoices"
            });

        }

        res.status(200).json(results);

    });

};


// Get Invoice By ID
const getInvoiceById = (req, res) => {

    const { id } = req.params;


    billingModel.getInvoiceById(id, (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch invoice"
            });

        }


        if (results.length === 0) {

            return res.status(404).json({
                message: "Invoice not found"
            });

        }


        res.status(200).json(results[0]);

    });

};


// Create Invoice
const createInvoice = (req, res) => {

    const {
        order_id,
        user_id,
        subtotal,
        tax_amount,
        discount_amount,
        payment_status,
        payment_method
    } = req.body;


    if (
    !order_id ||
    !user_id ||
    subtotal === undefined ||
    tax_amount === undefined ||
    isNaN(Number(subtotal)) ||
    isNaN(Number(tax_amount))
) {
    return res.status(400).json({
        message: "Valid Order ID, User ID, Subtotal and Tax are required"
    });
}

    const discount = Number(discount_amount) || 0;


    const totalAmount =
    Number(subtotal) +
    Number(tax_amount) -
    discount;

    const invoiceNumber =
        "INV-" +
        Date.now();


    const invoice = {

        order_id,

        user_id,

        invoice_number: invoiceNumber,

        subtotal,

        tax_amount,

        discount_amount: discount,

        total_amount: totalAmount,

        payment_status:
            payment_status || "Pending",

        payment_method:
            payment_method || "Cash"

    };


    billingModel.createInvoice(
        invoice,
        (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Failed to create invoice"
                });

            }


            res.status(201).json({

                message: "Invoice created successfully",

                invoiceId: result.insertId,

                invoiceNumber,

                subtotal: Number(subtotal),

                taxAmount: Number(tax_amount),

                discountAmount: Number(discount),

                totalAmount

            });

        }
    );

};


// Update Payment Status
const updatePaymentStatus = (req, res) => {

    const { id } = req.params;

    const { payment_status } = req.body;


    if (!payment_status) {

        return res.status(400).json({
            message: "Payment status is required"
        });

    }


    billingModel.updatePaymentStatus(
        id,
        payment_status,
        (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Failed to update payment status"
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Invoice not found"
                });

            }


            res.status(200).json({

                message: "Payment status updated successfully"

            });

        }
    );

};


// Update Payment Method
const updatePaymentMethod = (req, res) => {

    const { id } = req.params;

    const { payment_method } = req.body;


    if (!payment_method) {

        return res.status(400).json({
            message: "Payment method is required"
        });

    }


    billingModel.updatePaymentMethod(
        id,
        payment_method,
        (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Failed to update payment method"
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Invoice not found"
                });

            }


            res.status(200).json({

                message: "Payment method updated successfully"

            });

        }
    );

};


// Cancel Invoice
const cancelInvoice = (req, res) => {

    const { id } = req.params;


    billingModel.cancelInvoice(
        id,
        (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Failed to cancel invoice"
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Invoice not found"
                });

            }


            res.status(200).json({

                message: "Invoice cancelled successfully"

            });

        }
    );

};


// Delete Invoice
const deleteInvoice = (req, res) => {

    const { id } = req.params;


    billingModel.deleteInvoice(
        id,
        (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Failed to delete invoice"
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Invoice not found"
                });

            }


            res.status(200).json({

                message: "Invoice deleted successfully"

            });

        }
    );

};


module.exports = {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updatePaymentStatus,
    updatePaymentMethod,
    cancelInvoice,
    deleteInvoice
};