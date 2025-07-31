import { Card, CardContent, Typography, Box, Avatar, Button } from "@mui/material";
import "../styles/companyCard.css"; 
import { updateUserCompany } from "../services/userService"; 
import { incrementUsers } from "../services/companyService";
import { useState } from "react";
import ResumeDialog from "./SubmitResume";
import { Tooltip } from "@mui/material";

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
    padding: '1rem'
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
        sx={{ width: 50, height: 50, mr: 1, borderRadius: 2}}
        variant="square"
      />
      <Box>
        <Typography sx={{ fontSize: '1.1rem'}} variant="h6" component="div" fontWeight="bold">
          {company.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {company.industry || "Software Development"}
        </Typography>
      </Box>
    </Box>

    <Box sx={{ mt: 1 }}>
      <Typography variant="body2" color="text.secondary" >
        <span role="img" aria-label="employees">👥</span>{company.employees + " employees"}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="custom-typography" >
        <span role="img" aria-label="location">📌</span>{" "}
        {company.headquarters || company.location || ""}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="custom-typography" sx={{ mr: 1 }}>
        <span role="img" aria-label="users">👥</span> {company.users || "0"}
      </Typography>      
      <Tooltip title={company.description}>
        <Typography
          variant="body2"
          color="text.secondary"
          className="custom-typography"
          sx={{ mr: 1, paddingTop: '0.5rem' }}
        >
          <span role="img" aria-label="description"></span>
          {company.description.length > 150
            ? company.description.slice(0, 130) + '...'
            : company.description}
        </Typography>
      </Tooltip>
    </Box>

    <Box sx={{ paddingTop: '0.5rem' }}> 
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
    </Box>
  </Box>
  <ResumeDialog
  open={openResumeDialog}
  onClose={handleCloseResumeDialog}
  company={company}
  />
</Card>
  );
}