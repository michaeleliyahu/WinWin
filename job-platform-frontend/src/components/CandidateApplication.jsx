import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getCompanyById } from "../services/companyService";
import { createApplication } from "../services/applicationService";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

export default function CandidateApplication() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const passedCompany = location.state?.company;

  const [company, setCompany] = useState(passedCompany || null);
  const [jobLink, setJobLink] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [loading, setLoading] = useState(!passedCompany);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!passedCompany) {
      const fetchCompany = async () => {
        try {
          const comp = await getCompanyById(id);
          setCompany(comp);
        } catch (err) {
          console.error("שגיאה בטעינת החברה", err);
        } finally {
          setLoading(false);
        }
      };
      fetchCompany();
    }
  }, [id, passedCompany]);

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("אנא התחבר לפני הגשת קורות חיים");
      return;
    }
    if (!jobLink || !resumeLink) {
      alert("אנא מלא את כל השדות");
      return;
    }
    setSaving(true);
    try {
      await createApplication({
        userId: user._id,
        companyId: id,
        jobLink,
        resumeLink,
      });
      alert("הגשת קורות חיים נשמרה בהצלחה!");
      navigate("/HomePage");
    } catch (err) {
      alert("שגיאה בשמירת ההגשה");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Typography>טוען...</Typography>;
  if (!company) return <Typography>חברה לא נמצאה</Typography>;

  return (
    <Card sx={{ maxWidth: 600, margin: "2rem auto", p: 3, direction: "rtl" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {company.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          מספר עובדים: {company.number_of_employees}
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="קישור למשרה"
              variant="outlined"
              fullWidth
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
            />
            <TextField
              label="קישור לקורות חיים"
              variant="outlined"
              fullWidth
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
            />

            <Button variant="contained" onClick={handleSubmit} disabled={saving}>
              {saving ? "שומר..." : "הגש קורות חיים"}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
