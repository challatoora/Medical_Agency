import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
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

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await userAPI.getAll();
      setUsers(response);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await userAPI.delete(id);
      fetchUsers();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

        alert("User created successfully");
      }

      setShowForm(false);

      setEditingUser(null);

      fetchUsers();
    } catch (err) {
      alert("Operation failed");
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>Users</h1>
          <p>Manage medical agency users</p>
        </div>

        <button className="primary-button" onClick={handleAddUser}>
          <Plus size={18} />
          Add User
        </button>

      </div>

      {showForm && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <h2>
                {editingUser ? "Update User" : "Add User"}
              </h2>

              <button onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />

              {!editingUser && (

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              )}

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <div className="modal-buttons">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingUser ? "Update" : "Save"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {loading && <h3>Loading...</h3>}

      {error && <h3>{error}</h3>}

      {!loading && (

        <table className="users-table">

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

                <td>{user.phone}</td>

                <td>{user.role}</td>

                <td>

                  <button
                    className="icon-button"
                    onClick={() => handleEditUser(user)}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="icon-button delete"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default Users;