const API_URL = "http://52.201.247.34:5000";

const request = async (url, options = {}) => {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

export const userAPI = {
  getAll: () => request("/users"),

  create: (data) =>
    request("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/users/${id}`, {
      method: "DELETE",
    }),
};

export const medicineAPI = {
  getAll: () => request("/medicines"),

  create: (data) =>
    request("/medicines", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/medicines/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/medicines/${id}`, {
      method: "DELETE",
    }),
};

export const supplierAPI = {
  getAll: () => request("/suppliers"),

  create: (data) =>
    request("/suppliers", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/suppliers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/suppliers/${id}`, {
      method: "DELETE",
    }),
};

export const inventoryAPI = {
  getAll: () => request("/inventory"),

  create: (data) =>
    request("/inventory", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/inventory/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/inventory/${id}`, {
      method: "DELETE",
    }),
};

export const orderAPI = {
  getAll: () => request("/orders"),

  create: (data) =>
    request("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/orders/${id}`, {
      method: "DELETE",
    }),
};

export const billingAPI = {
  getAll: () => request("/billing"),

  create: (data) =>
    request("/billing", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/billing/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/billing/${id}`, {
      method: "DELETE",
    }),
};