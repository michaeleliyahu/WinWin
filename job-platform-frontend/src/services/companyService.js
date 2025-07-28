const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const createCompany = async (companyData) => {
  console.log("Creating company with data:", companyData);
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/companies`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(companyData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to create company");
  }
  return res.json();
};

export const updateCompany = async (companyId, data) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/companies/${companyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to update company");
  }
  return res.json();
};


export const deleteCompany = async (companyId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/companies/${companyId}`, {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to delete company");
  }
  return true;
};

export const getAllCompanies = async () => {
  const res = await fetch(`${API_URL}/companies`);
  if (!res.ok) throw new Error("Failed to fetch companies");
  return res.json();
};

export const getCompanyById = async (companyId) => {
  const res = await fetch(`${API_URL}/companies/${companyId}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to fetch company");
  }
  return res.json();
};