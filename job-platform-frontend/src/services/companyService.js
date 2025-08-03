import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_URL}/companies`, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createCompany = async (companyData) => {
  try {
    console.log("Creating company with data:", companyData);
    const res = await api.post("/", companyData); 
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to create company");
  }
};

export const incrementUsers = async (companyId) => {
  try {
    const res = await api.put(`/${companyId}/incrementUsers`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "increment_users failed");
  }
};

export const getAllCompanies = async () => {
  try {
    const res = await api.get("/");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch companies");
  }
};

export const getCompanyById = async (companyId) => {
  try {
    const res = await api.get(`/${companyId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch company");
  }
};