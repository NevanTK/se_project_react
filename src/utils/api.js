const baseUrl = "http://localhost:3001/api";

const headers = {
  "Content-Type": "application/json",
};

const handleServerResonse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Error: ${response.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResonse);
};

export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(item),
  }).then(handleServerResonse);
};

export const deleteItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResonse);
};
