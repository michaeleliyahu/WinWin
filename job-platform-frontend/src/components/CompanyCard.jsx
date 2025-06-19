import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import "../styles/companyCard.css"; 

export default function CompanyCard({ company, onClick }) {
  return (
    <Card className="custom-company-card">
      <CardActionArea onClick={() => onClick(company)}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {company.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            מספר עובדים: {company.number_of_employees}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
