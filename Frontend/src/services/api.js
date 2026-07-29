const API_URL = "http://52.201.247.34:5000";

export const userAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  },

  create: async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  },

  update: async (id, userData) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    return response.json();
  },
};