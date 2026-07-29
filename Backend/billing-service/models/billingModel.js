const db = require("../config/db");


// Get All Invoices
const getAllInvoices = (callback) => {

    const sql = `
        SELECT *
        FROM invoices
        ORDER BY id DESC
    `;

    db.query(sql, callback);
};


// Get Invoice By ID
const getInvoiceById = (id, callback) => {

    const sql = `
        SELECT *
        FROM invoices
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};


// Create Invoice
const createInvoice = (invoice, callback) => {

    const sql = `
        INSERT INTO invoices
        (
            order_id,
            user_id,
            invoice_number,
            subtotal,
            tax_amount,
            discount_amount,
            total_amount,
            payment_status,
            payment_method
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        invoice.order_id,
        invoice.user_id,
        invoice.invoice_number,
        invoice.subtotal,
        invoice.tax_amount,
        invoice.discount_amount,
        invoice.total_amount,
        invoice.payment_status || "Pending",
        invoice.payment_method || "Cash"
    ];

    db.query(sql, values, callback);
};


// Update Payment Status
const updatePaymentStatus = (id, paymentStatus, callback) => {

    const sql = `
        UPDATE invoices
        SET payment_status = ?
        WHERE id = ?
    `;

    db.query(sql, [paymentStatus, id], callback);
};


// Update Payment Method
const updatePaymentMethod = (id, paymentMethod, callback) => {

    const sql = `
        UPDATE invoices
        SET payment_method = ?
        WHERE id = ?
    `;

    db.query(sql, [paymentMethod, id], callback);
};


// Cancel Invoice
const cancelInvoice = (id, callback) => {

    const sql = `
        UPDATE invoices
        SET invoice_status = 'Cancelled'
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};


// Delete Invoice
const deleteInvoice = (id, callback) => {

    const sql = `
        DELETE FROM invoices
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
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