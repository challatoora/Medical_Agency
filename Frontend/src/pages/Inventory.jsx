import React, { useEffect, useState } from "react";
import { inventoryAPI } from "../services/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await inventoryAPI.getAll();

      setInventory(response);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Inventory</h1>

      {loading && <p>Loading inventory...</p>}

      {error && (
        <div>
          <p style={{ color: "red" }}>
            Failed to load inventory: {error}
          </p>

          <button onClick={fetchInventory}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Medicine ID</th>
              <th>Supplier ID</th>
              <th>Batch</th>
              <th>Quantity</th>
              <th>Expiry</th>
            </tr>
          </thead>

          <tbody>
            {inventory.length === 0 ? (
              <tr>
                <td colSpan="6">
                  No inventory found
                </td>
              </tr>
            ) : (
              inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.medicine_id}</td>
                  <td>{item.supplier_id}</td>
                  <td>{item.batch_number}</td>
                  <td>{item.quantity}</td>
                  <td>{item.expiry_date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Inventory;