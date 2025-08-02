import { Card,Typography, Box} from "@mui/material";

export default function CompanyProgress({ company }) {

  console.log("CompanyProgress component rendered with company:", company);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '75%',
        maxWidth: '72rem',
        height: '6rem',
        margin: '1rem',
        gap: '2rem',
        paddingTop: '1.5rem'
      }}
    >
      <Card sx={{ flex: 1, p: 2 ,height: '100%', borderRadius: 3}}>
        <Typography variant="h6">Current Users</Typography>
      </Card>
      <Card sx={{ flex: 1, p: 2 ,height: '100%', borderRadius: 3}}>
        <Typography variant="h6">Cvs Submitted</Typography>
      </Card>
      <Card sx={{ flex: 1, p: 2 ,height: '100%', borderRadius: 3}}>
        <Typography variant="h6">Response Rate</Typography>
      </Card>
    </Box>

  );
}
