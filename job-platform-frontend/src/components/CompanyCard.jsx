import { Card, CardContent, Typography, Box, Avatar, Button } from "@mui/material";
import "../styles/companyCard.css"; 

export default function CompanyCard({ company, onClick }) {
  return (
    <Card className="custom-company-card" sx={{ minWidth: 300, maxWidth: 350, m: 1 }}>
      {/* Remove CardActionArea to avoid nested button issue */}
      <CardContent
        onClick={() => onClick(company)}
        style={{ cursor: "pointer" }}
      >
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar
            src={company.logo}
            alt={company.name}
            sx={{ width: 40, height: 40, mr: 1 }}
            variant="square"
          />
          <Box>
            <Typography variant="h6" component="div" fontWeight="bold">
              {company.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {company.category || company.industry || "Software Development"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {company.headquarters || company.location || ""}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            <span role="img" aria-label="users">👥</span> {company.users || "0"} 
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={e => { e.stopPropagation(); /* handle message */ }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: 4, fontSize: 16 }}>✈️</span> Message
            </span>
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={e => e.stopPropagation()}
          >
            ✓ Following
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
