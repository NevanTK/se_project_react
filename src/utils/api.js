const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Error: ${response.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

export const getItems = () => {
  return request(`${baseUrl}/items`, { headers });
};

export const addItem = (item) => {
  const token = localStorage.getItem("jwt");
  const authHeaders = Object.assign({}, headers, {
    Authorization: `Bearer ${token}`,
  });

  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(item),
  }).then((response) => response.data);
};

export const deleteItem = (itemId) => {
  const token = localStorage.getItem("jwt");
  const authHeaders = Object.assign({}, headers, {
    Authorization: `Bearer ${token}`,
  });

  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: authHeaders,
  });
};

export const addCardLike = (itemId, token) => {
  const authHeaders = Object.assign({}, headers, {
    Authorization: `Bearer ${token}`,
  });

  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: authHeaders,
  }).then((response) => response.data);
};

export const removeCardLike = (itemId, token) => {
  const authHeaders = Object.assign({}, headers, {
    Authorization: `Bearer ${token}`,
  });

  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: authHeaders,
  }).then((response) => response.data);
};

export const getCurrentUser = (token) => {
  const authHeaders = Object.assign({}, headers, {
    Authorization: `Bearer ${token}`,
  });
  return request(`${baseUrl}/users/me`, { headers: authHeaders });
};

export const updateUser = (token, updatedUser) => {
  const authHeaders = Object.assign({}, headers, {
    Authorization: `Bearer ${token}`,
  });
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: authHeaders,
    body: JSON.stringify(updatedUser),
  });
};
