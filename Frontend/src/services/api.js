const API_HOST = "http://54.226.0.206";

const request = async (baseURL, url, options = {}) => {
  const response = await fetch(`${baseURL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  return response.json();
};


// ========================================
// USER SERVICE
// Port: 5006
// ========================================

const USER_API = `${API_HOST}:5006/api/users`;

export const userAPI = {
  getAll: () => request(USER_API, "/"),

  getById: (id) =>
    request(USER_API, `/${id}`),

  create: (data) =>
    request(USER_API, "/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data) =>
    request(USER_API, "/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(USER_API, `/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(USER_API, `/${id}`, {
      method: "DELETE",
    }),
};


// ========================================
// MEDICINE SERVICE
// Port: 5002
// ========================================

const MEDICINE_API = `${API_HOST}:5002/api/medicines`;

export const medicineAPI = {
  getAll: () =>
    request(MEDICINE_API, "/"),

  getById: (id) =>
    request(MEDICINE_API, `/${id}`),

  create: (data) =>
    request(MEDICINE_API, "/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(MEDICINE_API, `/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(MEDICINE_API, `/${id}`, {
      method: "DELETE",
    }),
};


// ========================================
// INVENTORY SERVICE
// Port: 5003
// ========================================

const INVENTORY_API = `${API_HOST}:5003/api/inventory`;

export const inventoryAPI = {
  getAll: () =>
    request(INVENTORY_API, "/"),

  getById: (id) =>
    request(INVENTORY_API, `/${id}`),

  create: (data) =>
    request(INVENTORY_API, "/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(INVENTORY_API, `/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(INVENTORY_API, `/${id}`, {
      method: "DELETE",
    }),
};


// ========================================
// SUPPLIER SERVICE
// Port: 5004
// ========================================

const SUPPLIER_API = `${API_HOST}:5004/api/suppliers`;

export const supplierAPI = {
  getAll: () =>
    request(SUPPLIER_API, "/"),

  getById: (id) =>
    request(SUPPLIER_API, `/${id}`),

  create: (data) =>
    request(SUPPLIER_API, "/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(SUPPLIER_API, `/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(SUPPLIER_API, `/${id}`, {
      method: "DELETE",
    }),
};


// ========================================
// ORDER SERVICE
// Port: 5005
// ========================================

const ORDER_API = `${API_HOST}:5005/api/orders`;

export const orderAPI = {
  getAll: () =>
    request(ORDER_API, "/"),

  getById: (id) =>
    request(ORDER_API, `/${id}`),

  create: (data) =>
    request(ORDER_API, "/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(ORDER_API, `/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(ORDER_API, `/${id}`, {
      method: "DELETE",
    }),
};


// ========================================
// BILLING SERVICE
// Port: 5001
// ========================================

const BILLING_API = `${API_HOST}:5001/api/billing`;

export const billingAPI = {
  getAll: () =>
    request(BILLING_API, "/"),

  getById: (id) =>
    request(BILLING_API, `/${id}`),

  create: (data) =>
    request(BILLING_API, "/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(BILLING_API, `/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(BILLING_API, `/${id}`, {
      method: "DELETE",
    }),
};