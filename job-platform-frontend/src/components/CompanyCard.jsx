import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";

export default function CompanyCard({ company, onClick }) {
  return (
    <Card sx={{ maxWidth: 345, margin: "1rem" }}>
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
