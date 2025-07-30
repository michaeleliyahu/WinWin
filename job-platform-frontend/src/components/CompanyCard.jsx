import { Card, CardContent, Typography, Box, Avatar, Button } from "@mui/material";
import "../styles/companyCard.css"; 
import { updateUserCompany } from "../services/userService"; 
import { incrementUsers } from "../services/companyService";
import { useState } from "react";
import ResumeDialog from "./SubmitResume";

export default function CompanyCard({ company: initialCompany, onClick }) {
  const [company, setCompany] = useState(initialCompany);
  const [openResumeDialog, setOpenResumeDialog] = useState(false);

  const handleJoinCompany = async (e) => {
    e.stopPropagation();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;
      await updateUserCompany(userId, { companyId: company._id });
      await incrementUsers(company._id);

      setCompany(prev => ({
      ...prev,
      users: (prev.users || 0) + 1
    }));
    } catch (error) {
      console.error("error on update user", error);
    }
  };

const handleOpenResumeDialog = (e) => {
  e.stopPropagation();
  setOpenResumeDialog(true);
};

const handleCloseResumeDialog = () => {
  setOpenResumeDialog(false);
};
  return (
<Card
  className="custom-company-card"
  sx={{
    minWidth: 300,
    maxWidth: 350,
    m: 1,
    direction: 'ltr',
    textAlign: 'left',
    borderRadius: 5,
  }}
>
  <Box sx={{
    paddingRight: '1rem',
    paddingLeft: '1rem'
  }}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Avatar
        src={company.logo}
        sx={{ width: 40, height: 40, mr: 1 }}
        variant="square"
      />
      <Box>
        <Typography variant="h6" component="div" fontWeight="bold">
          {company.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {company.industry || "Software Development"}
        </Typography>
      </Box>
    </Box>

    <Box sx={{ mt: 1 }}>
      <Typography variant="body2" color="text.secondary">
        <span role="img" aria-label="employees">👥</span>{company.employees + " employees"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <span role="img" aria-label="location">📌</span>{" "}
        {company.headquarters || company.location || ""}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
        <span role="img" aria-label="users">👥</span> {company.users || "0"}
      </Typography>      
      <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
        <span role="img" aria-label="description"></span> {company.description}
      </Typography>
    </Box>

    <CardContent onClick={() => onClick(company)} sx={{padding: 0,}}>
      <Box display="flex" gap={1}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            borderRadius: 3,
          }}
          onClick={handleJoinCompany}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 4, fontSize: 16 }}>✈️</span> i work here
          </span>
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          sx={{
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            borderRadius: 3,
          }}
          onClick={handleOpenResumeDialog}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 4, fontSize: 16 }}>📄</span> Submit Resume
          </span>
        </Button>
      </Box>
    </CardContent>
  </Box>
  <ResumeDialog
  open={openResumeDialog}
  onClose={handleCloseResumeDialog}
  company={company}
  />
</Card>
  );
}