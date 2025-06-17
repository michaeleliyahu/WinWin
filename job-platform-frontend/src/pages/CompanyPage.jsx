import React, { useState, useEffect } from "react";
import { createCompany, updateCompany, deleteCompany } from "../services/companyService";

export default function CompanyPage() {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setCompany(storedUser?.company || null);
    if (storedUser?.company) {
      setName(storedUser.company.name);
      setDescription(storedUser.company.description || "");
    }
  }, []);

const handleCreate = async () => {
  try {
    const newCompany = await createCompany({ name, description });
    setCompany(newCompany);
    setUser((prev) => ({ ...prev, company: newCompany }));
    localStorage.setItem("user", JSON.stringify({ ...user, company: newCompany }));
    setName("");
    setDescription("");
  } catch (error) {
    alert("שגיאה ביצירת חברה: " + error.message);
  }
};

  const handleUpdate = async () => {
    // שלח PUT לשרת לעדכן את החברה
    // עדכן את החברה במצב
  };

  const handleDelete = async () => {
    // שלח DELETE לשרת למחוק את החברה
    // הסר אותה מהמצב ומהמשתמש
  };

  if (!user) return <p>טוען...</p>;

  return (
    <div style={styles.container}>
      <h2>ניהול חברה</h2>

      {company ? (
        editing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="שם חברה"
              style={styles.input}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="תיאור"
              style={styles.textarea}
            />
            <button onClick={handleUpdate} style={styles.button}>שמור</button>
            <button onClick={() => setEditing(false)} style={styles.buttonCancel}>ביטול</button>
          </>
        ) : (
          <>
            <p><strong>שם:</strong> {company.name}</p>
            <p><strong>תיאור:</strong> {company.description}</p>
            <button onClick={() => setEditing(true)} style={styles.button}>עדכן</button>
            <button onClick={handleDelete} style={styles.buttonDanger}>מחק</button>
          </>
        )
      ) : (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="שם חברה"
            style={styles.input}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="תיאור"
            style={styles.textarea}
          />
          <button onClick={handleCreate} style={styles.button}>צור חברה</button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "600px", margin: "0 auto" },
  input: { padding: "0.5rem", width: "100%", marginBottom: "1rem" },
  textarea: { padding: "0.5rem", width: "100%", minHeight: "80px", marginBottom: "1rem" },
  button: { padding: "0.5rem", background: "#004aad", color: "white", border: "none", marginRight: "0.5rem" },
  buttonCancel: { padding: "0.5rem", background: "#888", color: "white", border: "none" },
  buttonDanger: { padding: "0.5rem", background: "red", color: "white", border: "none", marginTop: "1rem" }
};
