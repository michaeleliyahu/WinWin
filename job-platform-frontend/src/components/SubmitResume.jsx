import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  IconButton,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useRef } from "react";
import { createApplication } from "../services/applicationService";

export default function ResumeDialog({ open, onClose, company }) {
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.stopPropagation();

    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("companyId", company._id);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("mobileNumber", mobileNumber);
    formData.append("email", email);
    formData.append("jobLink", jobLink);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      formData.append("userId", user._id);

      await createApplication(formData);
      setSuccess(true);
    } catch (error) {
      console.error("error on update user", error);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  if (!open) return null;

  return success ? (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Application submitted!</DialogTitle>
      <DialogContent dividers>
        <Typography>
          Your application to {company?.name} was submitted successfully.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div">
          Apply to {company?.name}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="dense"
            label="First name"
            type="text"
            fullWidth
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            label="Last name"
            type="text"
            fullWidth
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            label="Mobile phone number"
            type="tel"
            fullWidth
            variant="outlined"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel id="email-select-label" required>
              Email address
            </InputLabel>
            <Select
              labelId="email-select-label"
              id="email-select"
              value={email}
              label="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            >
              <MenuItem value="">
                <em>Select an option</em>
              </MenuItem>
              <MenuItem value="michaeleliyahu65@gmail.com">
                michaeleliyahu65@gmail.com
              </MenuItem>
              <MenuItem value="mmyy605@gmail.com">mmyy605@gmail.com</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Job Link"
            type="url"
            fullWidth
            variant="outlined"
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="e.g., https://example.com/job-posting"
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Button variant="contained" component="label">
            Upload resume
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            </Button>
            {file && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Selected file: <strong>{file.name}</strong>
              </Typography>
            )}
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
              DOC, DOCX, PDF (2 MB)
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!file}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
