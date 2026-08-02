import React, { useEffect, useState } from "react";
import { inventoryAPI } from "../services/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    medicine_id: "",
    supplier_id: "",
    batch_number: "",
    quantity: "",
    purchase_price: "",
    selling_price: "",
    expiry_date: "",
    stock_status: "Available",
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  // GET ALL INVENTORY
  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await inventoryAPI.getAll();
      setInventory(response);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
      setError(error.message || "Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // RESET FORM
  const resetForm = () => {
    setFormData({
      medicine_id: "",
      supplier_id: "",
      batch_number: "",
      quantity: "",
      purchase_price: "",
      selling_price: "",
      expiry_date: "",
      stock_status: "Available",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        quantity: Number(formData.quantity),
        purchase_price: Number(formData.purchase_price),
        selling_price: Number(formData.selling_price),
      };

      if (editingId) {
        // UPDATE
        await inventoryAPI.update(editingId, data);
        alert("Inventory updated successfully");
      } else {
        // CREATE
        await inventoryAPI.create(data);
        alert("Inventory created successfully");
      }

      resetForm();
      fetchInventory();
    } catch (error) {
      console.error("Inventory operation failed:", error);
      alert(error.message || "Operation failed");
    }
  };

  // EDIT
  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      medicine_id: item.medicine_id || "",
      supplier_id: item.supplier_id || "",
      batch_number: item.batch_number || "",
      quantity: item.quantity || "",
      purchase_price: item.purchase_price || "",
      selling_price: item.selling_price || "",
      expiry_date: item.expiry_date || "",
      stock_status: item.stock_status || "Available",
    });

    setShowForm(true);
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inventory?"
    );

    if (!confirmDelete) return;

    try {
      await inventoryAPI.delete(id);

      alert("Inventory deleted successfully");

      fetchInventory();
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error.message || "Failed to delete inventory");
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Inventory</h1>
          <p style={styles.subtitle}>
            Manage your medicine inventory
          </p>
        </div>

        <button
          style={styles.addButton}
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Add Inventory
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div style={styles.formCard}>
          <h2>
            {editingId
              ? "Edit Inventory"
              : "Add New Inventory"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label>Medicine ID</label>
                <input
                  type="text"
                  name="medicine_id"
                  value={formData.medicine_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label>Supplier ID</label>
                <input
                  type="text"
                  name="supplier_id"
                  value={formData.supplier_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label>Batch Number</label>
                <input
                  type="text"
                  name="batch_number"
                  value={formData.batch_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label>Purchase Price</label>
                <input
                  type="number"
                  name="purchase_price"
                  value={formData.purchase_price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label>Selling Price</label>
                <input
                  type="number"
                  name="selling_price"
                  value={formData.selling_price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label>Expiry Date</label>
                <input
                  type="date"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label>Status</label>
                <select
                  name="stock_status"
                  value={formData.stock_status}
                  onChange={handleChange}
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Low Stock">
                    Low Stock
                  </option>

                  <option value="Out of Stock">
                    Out of Stock
                  </option>
                </select>
              </div>
            </div>

            <div style={styles.formActions}>
              <button
                type="submit"
                style={styles.saveButton}
              >
                {editingId
                  ? "Update Inventory"
                  : "Save Inventory"}
              </button>

              <button
                type="button"
                style={styles.cancelButton}
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={styles.message}>
          Loading inventory...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div style={styles.errorBox}>
          <p>
            Failed to load inventory: {error}
          </p>

          <button
            style={styles.retryButton}
            onClick={fetchInventory}
          >
            Retry
          </button>
        </div>
      )}

      {/* TABLE */}
      {!loading && !error && (
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Medicine ID</th>
                <th style={styles.th}>Supplier ID</th>
                <th style={styles.th}>Batch</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Purchase Price</th>
                <th style={styles.th}>Selling Price</th>
                <th style={styles.th}>Expiry</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {inventory.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    style={styles.empty}
                  >
                    No inventory found
                  </td>
                </tr>
              ) : (
                inventory.map((item) => (
                  <tr key={item.id}>
                    <td style={styles.td}>
                      {item.id}
                    </td>

                    <td style={styles.td}>
                      {item.medicine_id}
                    </td>

                    <td style={styles.td}>
                      {item.supplier_id}
                    </td>

                    <td style={styles.td}>
                      {item.batch_number}
                    </td>

                    <td style={styles.td}>
                      {item.quantity}
                    </td>

                    <td style={styles.td}>
                      ₹{item.purchase_price}
                    </td>

                    <td style={styles.td}>
                      ₹{item.selling_price}
                    </td>

                    <td style={styles.td}>
                      {item.expiry_date}
                    </td>

                    <td style={styles.td}>
                      <span style={styles.status}>
                        {item.stock_status}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <button
                        style={styles.editButton}
                        onClick={() =>
                          handleEdit(item)
                        }
                      >
                        Edit
                      </button>

                      <button
                        style={styles.deleteButton}
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        Delete
                      </button>
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

const styles = {
  container: {
    padding: "30px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    fontSize: "28px",
  },

  subtitle: {
    color: "#666",
    marginTop: "5px",
  },

  addButton: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },

  formCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    marginBottom: "25px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  input: {
    padding: "10px",
  },

  formActions: {
    marginTop: "25px",
    display: "flex",
    gap: "10px",
  },

  saveButton: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  cancelButton: {
    background: "#6b7280",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  tableCard: {
    background: "#fff",
    borderRadius: "10px",
    overflowX: "auto",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1000px",
  },

  th: {
    padding: "14px",
    textAlign: "left",
    background: "#f1f5f9",
    borderBottom: "1px solid #ddd",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #eee",
  },

  editButton: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    marginRight: "6px",
    borderRadius: "4px",
    cursor: "pointer",
  },

  deleteButton: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },

  status: {
    padding: "5px 10px",
    borderRadius: "15px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "13px",
  },

  message: {
    padding: "20px",
    textAlign: "center",
  },

  errorBox: {
    padding: "20px",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: "8px",
  },

  retryButton: {
    padding: "8px 15px",
    cursor: "pointer",
  },

  empty: {
    padding: "30px",
    textAlign: "center",
    color: "#777",
  },
};

export default Inventory;

