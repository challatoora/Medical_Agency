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

```
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
```

};

return ( <div className="page-container">

```
  <div className="page-header">
    <div>
      <h1>Billing</h1>
      <p>Manage medical agency invoices and payments</p>
    </div>

    <button onClick={fetchInvoices}>
      Refresh
    </button>
  </div>


  {/* Loading */}
  {loading && (
    <div className="loading-message">
      <p>Loading invoices...</p>
    </div>
  )}


  {/* Error */}
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


  {/* Success */}
  {!loading && !error && (
    <div className="table-container">

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created At</th>
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

                <td>
                  {invoice.id}
                </td>

                <td>
                  {invoice.order_id}
                </td>

                <td>
                  {invoice.user_id}
                </td>

                <td>
                  ₹{Number(invoice.amount).toFixed(2)}
                </td>

                <td>
                  {invoice.status}
                </td>

                <td>
                  {invoice.created_at
                    ? new Date(
                        invoice.created_at
                      ).toLocaleString()
                    : "-"}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  )}

</div>
```

);
}

export default Billing;
