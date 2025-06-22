const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const text = await res.text();

  if (!res.ok) {
    let detail;
    try {
      detail = JSON.parse(text).detail;
    } catch {
      detail = text;
    }
    throw new Error(detail);
  }

  return JSON.parse(text);
};

export const assignCompanyToUser = async (userId, companyId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ companyId }), 
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to assign company");
  }

  return res.json();
};

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8000/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return await res.json();
}