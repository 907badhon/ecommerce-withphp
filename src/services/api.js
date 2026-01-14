import axios from "axios";

const API_BASE_URL =
  "https://nondespotically-hasteless-annetta.ngrok-free.dev/ecommerce-backend/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    Accept: "*",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["X-Auth-Token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post("/auth/register.php", data),
  login: (data) => api.post("/auth/login.php", data),
};

export const productsAPI = {
  getAll: (params) => api.get("/products/list.php", { params }),
  getById: (id) => api.get(`/products/details.php?id=${id}`),
};

export const ordersAPI = {
  create: (data) => api.post("/orders/create.php", data),
  getAll: () => api.get("/orders/list.php"),
  updateStatus: (data) => api.post("/orders/update-status.php", data),
};

export default api;
