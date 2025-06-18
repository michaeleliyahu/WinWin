const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// יצירת הגשה חדשה
export const createApplication = async (applicationData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // אם אתה משתמש ב-JWT
    },
    body: JSON.stringify(applicationData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "שגיאה ביצירת ההגשה");
  }

  return res.json();
};
