import { request} from "./api";

const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

export const signUp = ({ name, avatar, email, password }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  })
};

export const signIn = ({ email, password }) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
};

//protect /signin, /signup, and getitem routes with token authentication
