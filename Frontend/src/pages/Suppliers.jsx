import React, { useEffect, useState } from "react";
import { supplierAPI } from "../services/api";

function Suppliers() {
  const emptySupplier = {
    name: "",
    company_name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  };

  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState(emptySupplier);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);

      const data = await supplierAPI.getAll();

      setSuppliers(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await supplierAPI.update(editingId, supplier);
      } else {
        await supplierAPI.create(supplier);
      }

      setSupplier(emptySupplier);
      setEditingId(null);

      fetchSuppliers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (item) => {
    setSupplier({
      name: item.name,
      company_name: item.company_name,
      email: item.email,
      phone: item.phone,
      address: item.address,
      status: item.status,
    });

    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this supplier?")) return;

    try {
      await supplierAPI.delete(id);

      fetchSuppliers();
    } catch (err) {
      alert(err.message);
    }
  };
    return (
    <div style={{ padding: "20px" }}>
      <h2>Supplier Management</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Supplier Name"
          value={supplier.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={supplier.company_name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={supplier.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={supplier.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={supplier.address}
          onChange={handleChange}
        />

        <select
          name="status"
          value={supplier.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">
          {editingId ? "Update Supplier" : "Add Supplier"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setSupplier(emptySupplier);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {loading && <h3>Loading...</h3>}

      {error && (
        <h3 style={{ color: "red" }}>
          {error}
        </h3>
      )}

      {!loading && (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="8">
                  No Suppliers Found
                </td>
              </tr>
            ) : (
              suppliers.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.company_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.status}</td>

                  <td>
                    <button
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
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