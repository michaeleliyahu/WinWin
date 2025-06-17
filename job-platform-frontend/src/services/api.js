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
      detail = JSON.parse(text).detail; // ⬅ תופס את הודעת השגיאה
    } catch {
      detail = text;
    }
    throw new Error(detail); // ⬅ זורק את ההודעה האמיתית
  }

  return JSON.parse(text);
};
