import { billingAPI } from "../services/api";
import React, { useEffect, useState } from "react";
import { billingAPI } from "../services/api";

function Billing() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await billingAPI.getAll();

      setInvoices(response);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);

      setError(
        error.message || "Unable to load billing records"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Billing</h1>
          <p>Manage medical agency invoices and payments</p>
        </div>

        <button onClick={fetchInvoices}>
          Refresh
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          <p>Loading invoices...</p>
        </div>
      )}

      {!loading && error && (
        <div className="error-message">
          <p>
            Failed to load invoices: {error}
          </p>

          <button onClick={fetchInvoices}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Invoice Number</th>
                <th>Subtotal</th>
                <th>Tax</th>
                <th>Discount</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
              </tr>
            </thead>

            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan="10">
                    No invoices found
                  </td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr
                    key={
                      invoice.id ||
                      invoice.invoice_id
                    }
                  >
                    <td>
                      {invoice.id ||
                        invoice.invoice_id ||
                        "-"}
                    </td>

                    <td>
                      {invoice.order_id || "-"}
                    </td>

                    <td>
                      {invoice.user_id || "-"}
                    </td>

                    <td>
                      {invoice.invoice_number || "-"}
                    </td>

                    <td>
                      ₹
                      {Number(
                        invoice.subtotal || 0
                      ).toFixed(2)}
                    </td>

                    <td>
                      ₹
                      {Number(
                        invoice.tax_amount || 0
                      ).toFixed(2)}
                    </td>

                    <td>
                      ₹
                      {Number(
                        invoice.discount_amount || 0
                      ).toFixed(2)}
                    </td>

                    <td>
                      <strong>
                        ₹
                        {Number(
                          invoice.total_amount || 0
                        ).toFixed(2)}
                      </strong>
                    </td>

                    <td>
                      {invoice.payment_status || "-"}
                    </td>

                    <td>
                      {invoice.payment_method || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Billing;
