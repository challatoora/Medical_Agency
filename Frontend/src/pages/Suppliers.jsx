import React, { useEffect, useState } from "react";
import { supplierAPI } from "../services/api";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await supplierAPI.getAll();

      setSuppliers(response);
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Suppliers</h1>

      {loading && <p>Loading suppliers...</p>}

      {error && (
        <div>
          <p style={{ color: "red" }}>
            Failed to load suppliers: {error}
          </p>

          <button onClick={fetchSuppliers}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="4">
                  No suppliers found
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Suppliers;