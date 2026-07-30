const USER_API_URL = "http://54.226.0.206:5006/api/users";

const request = async (url, options = {}) => {
  const response = await fetch(url, {
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
  getAll: () => request(USER_API_URL),

  getById: (id) =>
    request(`${USER_API_URL}/${id}`),

  create: (data) =>
    request(USER_API_URL, {
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