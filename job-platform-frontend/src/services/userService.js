import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const userApi = axios.create({
  baseURL: `${API_URL}/users`, //
  headers: {
    "Content-Type": "application/json",
  }
});

userApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Check if token is expired
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new axios.Cancel("Token expired");
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (credentials) => {
  try {
    const res = await userApi.post("/login", credentials);
    return res.data; 
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await userApi.post("/register", userData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Registration failed");
  }
};

export const updateUserCompany = async (userId, data) => {
  try {
    const res = await userApi.put(`/updateUserCompany/${userId}`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Update failed");
  }
};

export async function getCurrentUser() {
  try {
    const res = await userApi.get("/me");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch user");
  }
}