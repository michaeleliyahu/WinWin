import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_URL}/application`,  // שימוש נכון ב־template literal
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // גם פה שימוש נכון ב־template literal
  }
  return config;
});

export const createApplication = async (applicationData) => {
  try {
    console.log("client:", applicationData);
    const res = await api.post("/", applicationData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to create application");
  }
};
