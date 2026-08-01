// const USER_API_URL = "http://100.58.117.241:5006/api/users";
// const MEDICINE_API_URL = "http://100.58.117.241:5001/api/medicines";
// const INVENTORY_API_URL = "http://100.58.117.241:5003/api/inventory";
// const SUPPLIER_API_URL = "http://100.58.117.241:5002/api/suppliers";
// const ORDER_API_URL = "http://100.58.117.241:5004/api/orders";
// const BILLING_API_URL = "http://100.58.117.241:5005/api/billing";
const USER_API_URL = "http://mreddy.online/api/users";
const MEDICINE_API_URL = "http://mreddy.online/api/medicines";
const INVENTORY_API_URL = "http://mreddy.online/api/inventory";
const SUPPLIER_API_URL = "http://mreddy.online/api/suppliers";
const ORDER_API_URL = "http://mreddy.online/api/orders";
const BILLING_API_URL = "http://mreddy.online/api/billing";

const request = async (url, options = {}) => {
const response = await fetch(url, {
headers: {
"Content-Type": "application/json",
},
...options,
});

if (!response.ok) {
throw new Error(`API Error: ${response.status}`);
}

return response.json();
};

// ===============================
// USER API
// ===============================

export const userAPI = {
getAll: () =>
request(USER_API_URL),

getById: (id) =>
request(`${USER_API_URL}/${id}`),

create: (data) =>
request(`${USER_API_URL}/register`, {
method: "POST",
body: JSON.stringify(data),
}),

login: (data) =>
request(`${USER_API_URL}/login`, {
method: "POST",
body: JSON.stringify(data),
}),

update: (id, data) =>
request(`${USER_API_URL}/${id}`, {
method: "PUT",
body: JSON.stringify(data),
}),

delete: (id) =>
request(`${USER_API_URL}/${id}`, {
method: "DELETE",
}),
};

// ===============================
// MEDICINE API
// ===============================

// export const medicineAPI = {
// getAll: () =>
// request(MEDICINE_API_URL),

// getById: (id) =>
// request(`${MEDICINE_API_URL}/${id}`),

// create: (data) =>
// request(MEDICINE_API_URL, {
// method: "POST",
// body: JSON.stringify(data),
// }),

// update: (id, data) =>
// request(`${MEDICINE_API_URL}/${id}`, {
// method: "PUT",
// body: JSON.stringify(data),
// }),

// delete: (id) =>
// request(`${MEDICINE_API_URL}/${id}`, {
// method: "DELETE",
// }),
// };

// ===============================
// MEDICINE API
// ===============================

export const medicineAPI = {
  // GET ALL
  getAll: () =>
    request(MEDICINE_API_URL),

  // GET BY ID
  getById: (id) =>
    request(`${MEDICINE_API_URL}/${id}`),

  // CREATE
  create: (data) =>
    request(MEDICINE_API_URL, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // UPDATE
  update: (id, data) =>
    request(`${MEDICINE_API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // DELETE
  delete: (id) =>
    request(`${MEDICINE_API_URL}/${id}`, {
      method: "DELETE",
    }),
};

// ===============================
// INVENTORY API
// ===============================

export const inventoryAPI = {
getAll: () =>
request(INVENTORY_API_URL),

getById: (id) =>
request(`${INVENTORY_API_URL}/${id}`),

create: (data) =>
request(INVENTORY_API_URL, {
method: "POST",
body: JSON.stringify(data),
}),

update: (id, data) =>
request(`${INVENTORY_API_URL}/${id}`, {
method: "PUT",
body: JSON.stringify(data),
}),

delete: (id) =>
request(`${INVENTORY_API_URL}/${id}`, {
method: "DELETE",
}),
};

// ===============================
// SUPPLIER API
// ===============================

export const supplierAPI = {
getAll: () =>
request(SUPPLIER_API_URL),

getById: (id) =>
request(`${SUPPLIER_API_URL}/${id}`),

create: (data) =>
request(SUPPLIER_API_URL, {
method: "POST",
body: JSON.stringify(data),
}),

update: (id, data) =>
request(`${SUPPLIER_API_URL}/${id}`, {
method: "PUT",
body: JSON.stringify(data),
}),

delete: (id) =>
request(`${SUPPLIER_API_URL}/${id}`, {
method: "DELETE",
}),
};

// ===============================
// ORDER API
// ===============================

export const orderAPI = {
getAll: () =>
request(ORDER_API_URL),

getById: (id) =>
request(`${ORDER_API_URL}/${id}`),

create: (data) =>
request(ORDER_API_URL, {
method: "POST",
body: JSON.stringify(data),
}),

update: (id, data) =>
request(`${ORDER_API_URL}/${id}`, {
method: "PUT",
body: JSON.stringify(data),
}),

delete: (id) =>
request(`${ORDER_API_URL}/${id}`, {
method: "DELETE",
}),
};

// ===============================
// BILLING API
// ===============================

export const billingAPI = {
getAll: () =>
request(BILLING_API_URL),

getById: (id) =>
request(`${BILLING_API_URL}/${id}`),

create: (data) =>
request(BILLING_API_URL, {
method: "POST",
body: JSON.stringify(data),
}),

update: (id, data) =>
request(`${BILLING_API_URL}/${id}`, {
method: "PUT",
body: JSON.stringify(data),
}),

delete: (id) =>
request(`${BILLING_API_URL}/${id}`, {
method: "DELETE",
}),
};
