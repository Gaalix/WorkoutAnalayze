import {useContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {Card, CardContent, Typography, Button, Link, Grid} from "@mui/material";
import {styled, Box, Paper} from '@mui/system';
import {UserContext} from "../userContext";
import { Link as RouterLink } from "react-router-dom";

const StyledCard = styled(Card)({
    minWidth: 275,
    marginBottom: 12,
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)', // on hover make bg color slight gray
    },
});

const StyledTypography = styled(Typography)({
    fontSize: 14,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // underline with fading gray
    marginBottom: 12,
});

function Profile() {
    const [profile, setProfile] = useState({});
    const {user} = useContext(UserContext);

    useEffect(function () {
        const getProfile = async function () {
            const res = await fetch(`https:/raziprojekt.azurewebsites.net/users/${user._id}`, {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            setProfile(data);
        };
        getProfile();
    }, [user]);

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <StyledCard centered>
                <CardContent>
                    <StyledTypography color="textSecondary" gutterBottom>
                        {profile.username}
                    </StyledTypography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}><Typography variant="body1">Full Name: {profile.fullname}</Typography></Grid>
                        <Grid item xs={6}><Typography variant="body1">Email: {profile.email}</Typography></Grid>
                        <Grid item xs={6}><Typography variant="body1">Age: {profile.age}</Typography></Grid>
                        <Grid item xs={6}><Typography variant="body1">Sex: {profile.sex}</Typography></Grid>
                        <Grid item xs={6}><Typography variant="body1">Weight: {profile.weight}</Typography></Grid>
                        <Grid item xs={6}><Typography variant="body1">Height: {profile.height}</Typography></Grid>
                    </Grid>
                    <Box sx={{display: 'flex', justifyContent: 'right', marginTop: 3}}>
                        <Button variant="contained" color="primary" component={RouterLink} to="/EditProfile">
                            Edit Profile
                        </Button>
                    </Box>
                </CardContent>
            </StyledCard>
        </Box>
    );
}

export default Profile;