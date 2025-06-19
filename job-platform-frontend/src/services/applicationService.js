const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const createApplication = async (applicationData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, 
    },
    body: applicationData, 
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error creating application");
  }

  return res.json();
};

export const getApplicationsByCompany = async (companyId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/applications/by-company?companyId=${companyId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("שגיאה בשליפת ההגשות");
  return res.json();
};

export async function submitApplication(applicationId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/applications/${applicationId}/submit`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to submit application");
  }
  return await response.json();
}
