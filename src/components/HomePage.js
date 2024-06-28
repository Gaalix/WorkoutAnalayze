import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { Button, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function HomePage() {
    const context = useContext(UserContext);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <Typography variant="h3" component="div" gutterBottom>
                Welcome to our Workout App!
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
                This application allows you to check your workouts and analyze everything about them.
            </Typography>
            {!context.user && (
                <>
                    <Typography variant="h5" component="div" gutterBottom>
                        Please register or login to use the application.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 2 }}>
                        <Button variant="contained" color="primary" component={RouterLink} to="/register" sx={{ marginRight: 2 }}>
                            Register
                        </Button>
                        <Button variant="contained" color="primary" component={RouterLink} to="/login">
                            Login
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default HomePage;