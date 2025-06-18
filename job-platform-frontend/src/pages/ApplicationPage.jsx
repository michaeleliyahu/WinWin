import React, { useEffect, useState } from "react";
import { getApplicationsByCompany, submitApplication } from "../services/applicationService";
import { Box, Typography, Card, CardContent, Stack, Button, Alert } from "@mui/material";

export default function ApplicationPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.company?._id) return;

    const fetchApplications = async () => {
      try {
        const data = await getApplicationsByCompany(user.company._id);
        setApplications(data);
      } catch (err) {
        console.error("שגיאה בטעינת ההגשות", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleSubmit = async (applicationId) => {
    setSubmittingId(applicationId);
    try {
      await submitApplication(applicationId);
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app._id === applicationId ? { ...app, submitted: true } : app
        )
      );
      setSuccessMessage("ההגשה נשלחה בהצלחה!");
      setTimeout(() => setSuccessMessage(null), 3000); // מסתיר אחרי 3 שניות
    } catch (err) {
      alert("אירעה שגיאה בעת שליחת ההגשה");
      console.error(err);
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) return <Typography>טוען הגשות...</Typography>;
  if (applications.length === 0) return <Typography>אין עדיין הגשות</Typography>;

  return (
    <Box sx={{ maxWidth: 700, margin: "2rem auto", direction: "rtl" }}>
      <Typography variant="h5" gutterBottom align="center">
        הגשות לחברה שלך
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, textAlign: "center" }}>
          {successMessage}
        </Alert>
      )}

      <Stack spacing={2}>
        {applications.map((app) => (
          <Card key={app._id}>
            <CardContent>
              <Typography>
                <strong>קישור למשרה:</strong>{" "}
                <a href={app.jobLink} target="_blank" rel="noopener noreferrer">
                  {app.jobLink}
                </a>
              </Typography>
              <Typography>
                <strong>קורות חיים:</strong>{" "}
                <a href={app.resumeLink} target="_blank" rel="noopener noreferrer">
                  {app.resumeLink}
                </a>
              </Typography>
              <Typography>
                <strong>הוגש:</strong> {app.submitted ? "כן" : "לא"}
              </Typography>

              {!app.submitted && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit(app._id)}
                  disabled={submittingId === app._id}
                  sx={{ mt: 2 }}
                >
                  {submittingId === app._id ? "שולח..." : "Submit"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
