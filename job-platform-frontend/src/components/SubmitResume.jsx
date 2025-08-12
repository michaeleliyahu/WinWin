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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createApplication } from "../services/applicationService";

export default function ResumeDialog({ open, onClose, company }) {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("companyId", company._id);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("mobileNumber", data.mobileNumber);
    formData.append("email", data.email);
    formData.append("jobLink", data.jobLink);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      formData.append("userId", user._id);

      await createApplication(formData);
      setSuccess(true);
      reset();
      setFile(null);
    } catch (error) {
      console.error("error on submit application", error);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    reset();
    setFile(null);
    onClose();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
  };

  const fileIsValid = !!file;

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
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="dense"
              label={
              <>
                First name<Typography component="span" color="error">*</Typography>
              </>
            }
            fullWidth
            {...register("firstName", { required: "First name is required" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            label={
              <>
                Last name<Typography component="span" color="error">*</Typography>
              </>
            }
            fullWidth
            {...register("lastName", { required: "Last name is required" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            label={
              <>
                Mobile phone number<Typography component="span" color="error">*</Typography>
              </>
            }
            fullWidth
            {...register("mobileNumber", {
              required: "Mobile number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone must be 10 digits",
              },
            })}
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber?.message}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            label={
              <>
                Email address<Typography component="span" color="error">*</Typography>
              </>
            }
            fullWidth
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            label={
              <>
                Job Link<Typography component="span" color="error">*</Typography>
              </>
            }
            fullWidth
            {...register("jobLink", {
              required: "Job link is required",
            })}
            error={!!errors.jobLink}
            helperText={errors.jobLink?.message}
            sx={{ mb: 2 }}
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
                hidden
              />
            </Button>
            {!fileIsValid && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 1 }}
              >
                Resume file is required<Typography component="span" color="error">*</Typography>
              </Typography>
            )}
            {file && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Selected file: <strong>{file.name}</strong>
              </Typography>
            )}
          </Box>

          <DialogActions sx={{ px: 0 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || !fileIsValid}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
