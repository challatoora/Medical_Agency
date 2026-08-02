export const orderAPI = {

  getAll: () =>
    request(ORDER_API_URL),

  getByUserId: (userId) =>
    request(`${ORDER_API_URL}?userId=${userId}`),

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