import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { createApplication } from "../services/applicationService";
import { FaUpload } from "react-icons/fa";
import PillButton from "../components/PillButton";

export default function ApplicationPage() {
  const userId = localStorage.getItem("userId");
  const { id: companyId } = useParams();
  const location = useLocation();
  const company = location.state?.company || null;

  const [formData, setFormData] = useState({
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

    if (!formData.email || !formData.phone || !formData.jobLink || !formData.resumeFile) {
      alert("Please fill all fields and upload your resume.");
      return;
    }

    if (!companyId) {
      alert("Company ID is missing.");
      return;
    }

    const data = new FormData();
    data.append("userId", userId);
    data.append("companyId", companyId);
    data.append("jobLink", formData.jobLink);
    data.append("resume", formData.resumeFile);
    data.append("email", formData.email);
    data.append("phone", formData.phone);

    try {
      await createApplication(data);
      alert("Application submitted successfully!");
      setFormData({
        email: "",
        phone: "",
        jobLink: "",
        resumeFile: null,
      });
      navigate("/thank-you");
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

        <label style={{ display: "block", marginBottom: 20 }}>
          <span
            onClick={() => document.getElementById("resume-upload").click()}
            style={{
              cursor: "pointer",
              color: "#007BFF",
              textDecoration: "underline",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 8,
            }}
          >
            <FaUpload /> Attach Resume
          </span>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
            required
          />
          {formData.resumeFile && (
            <div style={{ marginTop: 8, fontSize: "0.95rem", color: "#333" }}>
              <strong>{formData.resumeFile.name}</strong>
            </div>
          )}
        </label>


        <PillButton label="Submit Application" variant="dark" />
      </form>
    </div>
  );
}
