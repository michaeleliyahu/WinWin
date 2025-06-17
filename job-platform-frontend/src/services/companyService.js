const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const createCompany = async (companyData) => {
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

export const updateCompany = async (companyId, companyData) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/companies/${companyId}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(companyData),
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
