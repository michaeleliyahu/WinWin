import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Stack,
} from "@mui/material";
import { getAllCompanies, createCompany, updateCompany } from "../services/companyService";
import { assignCompanyToUser } from "../services/userService";

export default function EmployerCompany() {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setCompany(storedUser?.company || null);
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const all = await getAllCompanies();
      setCompanies(all);
    } catch (err) {
      console.error("שגיאה בשליפת חברות", err);
    }
  };

  const handleLeaveCompany = async () => {
    if (!user || !company) return;
    try {
      await assignCompanyToUser(user._id, null);
      await updateCompany(company._id, {
        number_of_employees: company.number_of_employees - 1,
      });
      const updatedUser = { ...user, company: null };
      setUser(updatedUser);
      setCompany(null);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      alert("שגיאה ביציאה מהחברה");
    }
  };

  const handleSave = async () => {
    try {
      let selectedCompany;
      if (isOtherSelected) {
        selectedCompany = await createCompany({ name: newCompanyName });
      } else {
        selectedCompany = companies.find((c) => c._id === selectedCompanyId);
        await updateCompany(selectedCompany._id, {
          number_of_employees: selectedCompany.number_of_employees + 1,
        });
      }

      await assignCompanyToUser(user._id, selectedCompany._id);
      const updatedUser = { ...user, company: selectedCompany };
      setUser(updatedUser);
      setCompany(selectedCompany);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEditing(false);
    } catch (err) {
      alert("שגיאה בעדכון חברה");
    }
  };

  if (!user) return <Typography>טוען...</Typography>;

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", mt: 4, p: 2, direction: "rtl" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          פרטי החברה שלך
        </Typography>

        {!editing ? (
          company ? (
            <>
              <Typography>
                <strong>שם החברה:</strong> {company.name}
              </Typography>
              <Typography>
                <strong>מספר עובדים:</strong> {company.number_of_employees}
              </Typography>

              <Stack direction="row" spacing={2} mt={2}>
                <Button variant="contained" onClick={() => setEditing(true)}>
                  ערוך
                </Button>
                <Button variant="outlined" color="error" onClick={handleLeaveCompany}>
                  כבר לא עובד בחברה זו
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <Typography>אין לך חברה כרגע.</Typography>
              <Button variant="contained" sx={{ mt: 2 }} onClick={() => setEditing(true)}>
                בחר או צור חברה
              </Button>
            </>
          )
        ) : (
          <>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="company-select-label">בחר חברה</InputLabel>
              <Select
                labelId="company-select-label"
                value={selectedCompanyId}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedCompanyId(val);
                  setIsOtherSelected(val === "other");
                }}
                label="בחר חברה"
              >
                <MenuItem value="">בחר...</MenuItem>
                {companies.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
                <MenuItem value="other">אחר...</MenuItem>
              </Select>
            </FormControl>

            {isOtherSelected && (
              <TextField
                fullWidth
                label="שם חברה חדשה"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                sx={{ mt: 2 }}
              />
            )}

            <Stack direction="row" spacing={2} mt={3}>
              <Button variant="contained" onClick={handleSave}>
                שמור
              </Button>
              <Button variant="outlined" onClick={() => setEditing(false)}>
                ביטול
              </Button>
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
}
