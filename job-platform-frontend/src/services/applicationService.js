import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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
    const res = await api.post("/", applicationData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to create application");
  }
};
/**
 * @param {string} companyId
 */
export const getApplicationsByCompany = async (companyId) => {
  try {
    const res = await api.get(`/applications/company/${companyId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch applications");
  }
};

export const downloadResume = async (fileId) => {
  try {
    const response = await api.get(`/resume/${fileId}`, {
      responseType: "blob"
    });

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `resume_${fileId}.pdf`;
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to download resume:", err);
  }
};