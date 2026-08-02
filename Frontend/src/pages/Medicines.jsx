import React, { useEffect, useState } from "react";
import { medicineAPI } from "../services/api";
import "./Medicines.css";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

  // =========================
  // LOGGED-IN USER
  // =========================

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const role =
    user.role?.toLowerCase().trim();

  const isAdmin =
    role === "admin";

  const isUser =
    role === "user";

  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    manufacturer: "",
    price: "",
    quantity: "",
    expiry_date: "",
    description: "",
  });

  // =========================
  // FETCH MEDICINES
  // =========================

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await medicineAPI.getAll();

      setMedicines(response);
    } catch (err) {
      console.error(
        "Failed to load medicines:",
        err
      );

      setError(
        err.message ||
        "Failed to load medicines"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      manufacturer: "",
      price: "",
      quantity: "",
      expiry_date: "",
      description: "",
    });

    setEditingMedicine(null);
    setShowForm(false);
  };

  // =========================
  // ADD / UPDATE MEDICINE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const data = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };

      if (editingMedicine) {
        await medicineAPI.update(
          editingMedicine._id,
          data
        );

        alert("Medicine updated");
      } else {
        await medicineAPI.create(data);

        alert("Medicine added");
      }

      resetForm();
      fetchMedicines();
    } catch (err) {
      console.error(
        "Medicine save failed:",
        err
      );

      setError(
        err.message ||
        "Failed to save medicine"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // EDIT MEDICINE
  // =========================

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);

    setFormData({
      name: medicine.name || "",
      category: medicine.category || "",
      manufacturer:
        medicine.manufacturer || "",
      price: medicine.price || "",
      quantity: medicine.quantity || "",
      expiry_date:
        medicine.expiry_date || "",
      description:
        medicine.description || "",
    });

    setShowForm(true);
  };

  // =========================
  // DELETE MEDICINE
  // =========================

  const handleDelete = async (
    id,
    name
  ) => {
    if (
      !window.confirm(
        `Delete ${name}?`
      )
    ) {
      return;
    }

    try {
      await medicineAPI.delete(id);

      alert("Medicine deleted");

      fetchMedicines();
    } catch (err) {
      console.error(
        "Medicine delete failed:",
        err
      );

      alert(
        "Failed to delete medicine"
      );
    }
  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (medicine) => {
    // Make sure logged-in user exists
    const loggedInUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (
      !loggedInUser ||
      !loggedInUser.id
    ) {
      alert(
        "User information not found. Please login again."
      );

      return;
    }

    let cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const existing =
      cart.find(
        (item) =>
          item._id === medicine._id
      );

    if (existing) {
      cart = cart.map(
        (item) =>
          item._id === medicine._id
            ? {
                ...item,
                cartQuantity:
                  Number(
                    item.cartQuantity
                  ) + 1,
              }
            : item
      );
    } else {
      cart.push({
        ...medicine,
        cartQuantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert(
      `${medicine.name} added to cart`
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="medicines-page">
        <h1>Medicines</h1>

        <div className="medicines-card">
          <h2>
            Loading Medicines...
          </h2>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="medicines-page">

      <div className="medicines-page-header">

        <div>
          <h1>
            Medicines
          </h1>

          <p>
            Available medicines
          </p>
        </div>

        {isAdmin && (
          <button
            className="add-medicine-btn"
            onClick={() => {
              setEditingMedicine(null);
              setShowForm(true);
            }}
          >
            + Add Medicine
          </button>
        )}

      </div>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {isAdmin && showForm && (
        <div className="medicine-form-card">

          <h2>
            {editingMedicine
              ? "Edit Medicine"
              : "Add Medicine"}
          </h2>

          <form
            onSubmit={handleSubmit}
          >

            <input
              name="name"
              placeholder="Medicine Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <input
              name="manufacturer"
              placeholder="Manufacturer"
              value={
                formData.manufacturer
              }
              onChange={handleChange}
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={
                formData.quantity
              }
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save"}
            </button>

            <button
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>

          </form>

        </div>
      )}

      <div className="medicines-card">

        <table className="medicine-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {medicines.map(
              (medicine) => (

                <tr
                  key={
                    medicine._id
                  }
                >

                  <td>
                    {medicine._id
                      ? medicine._id.substring(
                          0,
                          8
                        )
                      : "-"}
                  </td>

                  <td>
                    {medicine.name}
                  </td>

                  <td>
                    {medicine.category}
                  </td>

                  <td>
                    ₹{medicine.price}
                  </td>

                  <td>
                    {medicine.quantity}
                  </td>

                  <td>

                    {isAdmin && (
                      <>
                        <button
                          className="edit-medicine-btn"
                          onClick={() =>
                            handleEdit(
                              medicine
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-medicine-btn"
                          onClick={() =>
                            handleDelete(
                              medicine._id,
                              medicine.name
                            )
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {isUser && (
                      <button
                        className="add-cart-btn"
                        onClick={() =>
                          addToCart(
                            medicine
                          )
                        }
                      >
                        🛒 Add Cart
                      </button>
                    )}

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Medicines;

