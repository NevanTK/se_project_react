import { request} from "./api";
import { BASE_URL } from "../utils/constants";

const headers = {
  "Content-Type": "application/json",
};

export const signUp = ({ name, avatar, email, password }) => {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  })
};

export const signIn = ({ email, password }) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
};

//protect /signin, /signup, and getitem routes with token authentication
