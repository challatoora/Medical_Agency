import React, { useEffect, useState } from "react";
import { userAPI } from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await userAPI.getAll();

      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add User
  const handleAddUser = () => {
    setEditingUser(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "user",
    });

    setShowForm(true);
  };

  // Edit User
  const handleEditUser = (user) => {
    setEditingUser(user);

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      password: "",
      role: user.role || "user",
    });

    setShowForm(true);
  };

  // Create / Update User
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      if (editingUser) {
        await userAPI.update(editingUser.id, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
        });

        alert("User updated successfully");
      } else {
        await userAPI.create({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        });

        alert("User registered successfully");
      }

      setShowForm(false);
      setEditingUser(null);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
      });

      await fetchUsers();
    } catch (error) {
      console.error("User operation failed:", error);
      setError(error.message || "User operation failed");
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await userAPI.delete(id);

      alert("User deleted successfully");

      await fetchUsers();
    } catch (error) {
      console.error("Delete user failed:", error);
      setError(error.message || "Failed to delete user");
    }
  };

  // Cancel Form
  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p>Manage users and administrators</p>
        </div>

        <div>
          <button onClick={fetchUsers}>Refresh</button>

          <button onClick={handleAddUser}>Add User</button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <h2>
            {editingUser ? "Update User" : "Register New User"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            {!editingUser && (
              <div>
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </div>
            )}

            <div>
              <label>Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <button type="submit">
                {editingUser ? "Update User" : "Register User"}
              </button>

              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && (
        <div className="loading-message">
          <p>Loading users...</p>
        </div>
      )}

      {!loading && users.length === 0 && (
        <div>
          <p>No users found.</p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.phone || "-"}</td>

                  <td>{user.role}</td>

                  <td>
                    <button onClick={() => handleEditUser(user)}>
                      Edit
                    </button>

                    <button onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
