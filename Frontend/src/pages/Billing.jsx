import React, { useEffect, useState } from "react";
import { billingAPI } from "../services/api";

function Billing() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await billingAPI.getAll();

      setInvoices(response);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Billing</h1>

      {loading && <p>Loading invoices...</p>}

      {error && (
        <div>
          <p style={{ color: "red" }}>
            Failed to load invoices: {error}
          </p>

          <button onClick={fetchInvoices}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Invoice</th>
              <th>Order ID</th>
              <th>Subtotal</th>
              <th>Total</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan="6">
                  No invoices found
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.invoice_number}</td>
                  <td>{invoice.order_id}</td>
                  <td>${invoice.subtotal}</td>
                  <td>${invoice.total_amount}</td>
                  <td>{invoice.payment_status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Billing;