import "../styles/searchPage.css";
import { Card, CardContent, Typography, Box, Avatar, Button } from "@mui/material";
import { Tooltip } from "@mui/material";


export default function CompanyCover({ company }) {

  return (
    <div className="homepage-container">
        <div className="p-card" style={{ padding: '1rem', margin: '1rem' }}> 
            <Box sx={{display: 'flex'}}>
                <Avatar
                    src={company.logo}
                    sx={{ width: 100, height: 100, mr: 1, borderRadius: 2 }}
                    variant="square"
                />
                <Box sx={{flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: '1.1rem' }} variant="h6" component="div" fontWeight="bold" align="left">
                    {company.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="left" width={"70%"} padding= '0.3rem 0 0 0 '>
                            <span role="img" aria-label="employees"></span>{company.description + " employees"}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, paddingTop: '0.5rem' }}>
                        <Typography variant="body2" color="text.secondary" align="left">
                            <span role="img" aria-label="location">📌</span>{" "}
                            {company.headquarters || company.location || ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="left">
                            <span role="img" aria-label="employees">👥</span>{company.employees + " employees"}
                        </Typography>
                    </Box>
                    {/* <Typography variant="body2" color="text.secondary" align="left">
                    {company.industry || "Software Development"}
                    </Typography> */}

                    {/* <Typography variant="body2" color="text.secondary"  align="left" sx={{ mr: 1 }}>
                    <span role="img" aria-label="users">👥</span> {company.users || "0"}
                    </Typography> */}

                </Box>
            </Box>
        </div>
    </div>

  );
}