import axios from "axios";
export const apiClient = axios.create({
  baseURL: process.env.API_DOMEN,
  headers: {
    accept: "application/json",
  },
});
