import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { createApplication } from "../services/applicationService";

export default function ApplicationPage() {
  const { companyId } = useParams();
  const location = useLocation();
  const company = location.state?.company || null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobLink: "",
    resumeFile: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((f) => ({ ...f, resumeFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.phone || !formData.name || !formData.jobLink || !formData.resumeFile) {
      alert("Please fill all fields and upload your resume.");
      return;
    }

    if (!companyId) {
      alert("Company ID is missing.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("jobLink", formData.jobLink);
    data.append("resume", formData.resumeFile);
    data.append("companyId", companyId);  // מוסיף companyId למשלוח

    try {
      await createApplication(data);
      alert("Application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        jobLink: "",
        resumeFile: null,
      });
      navigate("/thank-you"); // למשל, ניווט לעמוד תודה אחרי הגשה
    } catch (error) {
      alert("Failed to submit application. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="homepage-container">
      <div className="framer-style-header">
        <h1 className="main-title">Apply through a company employee.</h1>
        <h1 className="sub-title">
          {company ? `Submitting to: ${company.name}` : "Let someone inside submit for you."}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 500, marginTop: 20 }}>
        {/* ... שדות הטופס כפי שכתבנו קודם ... */}
        <label>
          Name:<br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
            required
          />
        </label>
        <label>
          Email:<br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
            required
          />
        </label>
        <label>
          Phone Number:<br />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
            required
          />
        </label>
        <label>
          Job Link:<br />
          <input
            type="url"
            name="jobLink"
            value={formData.jobLink}
            onChange={handleInputChange}
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
            required
          />
        </label>
        <label>
          Upload Resume:<br />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ marginBottom: 20 }}
            required
          />
        </label>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
