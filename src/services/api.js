import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  register: (data) => api.post("/auth/register.php", data),
  login: (data) => api.post("/auth/login.php", data),
};

export const productsAPI = {
  getAll: (params) => api.get("/products/list.php", { params }),
  getById: (id) => api.get("/products/details.php", { params: { id } }),
};

export const ordersAPI = {
  create: (data) => api.post("/orders/create.php", data),
  getAll: () => api.get("/orders/list.php"),
  updateStatus: (data) => api.post("/orders/update-status.php", data),
};

export default api;
