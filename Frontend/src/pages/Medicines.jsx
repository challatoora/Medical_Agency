import React, { useEffect, useState } from "react";
import { medicineAPI } from "../services/api";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await medicineAPI.getAll();

      setMedicines(response);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Medicines</h1>

      {loading && <p>Loading medicines...</p>}

      {error && (
        <div>
          <p style={{ color: "red" }}>
            Failed to load medicines: {error}
          </p>

          <button onClick={fetchMedicines}>
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
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan="4">
                  No medicines found
                </td>
              </tr>
            ) : (
              medicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td>{medicine.id}</td>
                  <td>{medicine.name}</td>
                  <td>{medicine.category}</td>
                  <td>{medicine.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Medicines;