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
import { useState, useRef } from "react"; // Import useRef

export default function ResumeDialog({ open, onClose, company }) {
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  // Create a ref for the hidden file input
  const fileInputRef = useRef(null);

  const handleSubmit = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("notes", notes);
    formData.append("companyId", company._id);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("mobileNumber", mobileNumber);
    formData.append("email", email);

    // In a real application, you would send this formData to your backend
    console.log("Submitting resume for:", company?.name);
    console.log("File:", file.name);
    console.log("Notes:", notes);
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Mobile Number:", mobileNumber);
    console.log("Email:", email);

    onClose();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to trigger the hidden file input
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          Apply to {company?.name}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
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
            <InputLabel id="email-select-label" required>Email address</InputLabel>
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
              <MenuItem value="michaeleliyahu65@gmail.com">michaeleliyahu65@gmail.com</MenuItem>
              <MenuItem value="mmyy605@gmail.com">mmyy605@gmail.com</MenuItem>
            </Select>
          </FormControl>

          {/* --- File Upload Section --- */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
            <Button
              variant="contained" // Use 'contained' for a prominent button, or 'outlined'/'text'
              component="label" // Important: makes the button act as a label for the input
              onClick={handleUploadButtonClick}
            >
              Upload resume
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the default file input
                ref={fileInputRef} // Attach the ref here
              />
            </Button>
            {file && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Selected file: **{file.name}**
              </Typography>
            )}
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
              DOC, DOCX, PDF (2 MB)
            </Typography>
          </Box>
          {/* --- End File Upload Section --- */}

        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!file}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}