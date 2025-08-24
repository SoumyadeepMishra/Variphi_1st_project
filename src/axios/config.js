import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com";

const client = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default client;
