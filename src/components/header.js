import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Header(props) {
    const context = useContext(UserContext);

    return (
        <AppBar position="static" sx={{ marginBottom: 4 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1.25rem' }}>
                    {props.title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flexGrow: 1 }}>
                    {context.user ? (
                        <>
                            <Button color="inherit" component={RouterLink} to="/Workouts" sx={{ '&:hover': { color: 'black' } }}>My Workouts</Button>
                            <Button color="inherit" component={RouterLink} to="/WorkoutData" sx={{ '&:hover': { color: 'black' } }}>Workout Data</Button>
                            <Button color="inherit" component={RouterLink} to="/QuestionData" sx={{ '&:hover': { color: 'black' } }}>Question Data</Button>
                            <Button color="inherit" component={RouterLink} to="/profile" sx={{ marginLeft: 2, '&:hover': { color: 'black' } }}>Profile</Button>
                            <Button color="inherit" component={RouterLink} to="/logout" sx={{ '&:hover': { color: 'black' } }}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={RouterLink} to="/" sx={{ '&:hover': { color: 'black' } }}>Home</Button>
                            <Button color="inherit" component={RouterLink} to="/login" sx={{ '&:hover': { color: 'black' } }}>Login</Button>
                            <Button color="inherit" component={RouterLink} to="/register" sx={{ '&:hover': { color: 'black' } }}>Register</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;