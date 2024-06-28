import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../userContext";
import {Card, CardContent, Typography} from "@mui/material";
import {styled} from '@mui/system';
import {Link} from "react-router-dom";
import {MapContainer, TileLayer, Marker, Polyline} from 'react-leaflet';

function Workouts(props) {
    const [workouts, setWorkouts] = useState([]);
    const {user} = useContext(UserContext);

    const StyledCard = styled(Card)({
        minWidth: 275,
        marginBottom: 12,
        padding: '20px',
        margin: '20px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        borderColor: '#00008b',
        borderWidth: 1,
        borderStyle: 'solid',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
    });

    const StyledTypography = styled(Typography)({
        fontSize: 14, borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // underline with fading gray
        marginBottom: 12,
    });

    useEffect(() => {
        fetchWorkouts();
    }, [user]);

    const fetchWorkouts = async () => {
        if (!user) {
            setWorkouts([]);
            return
        }

        try {
            const response = await fetch(`https:/raziprojekt.azurewebsites.net/workouts/user/${user._id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setWorkouts(data);
            } else {
                console.error('Fetched data is not an array:', data);
                setWorkouts([]); // Ensure workouts is always an array
            }
        } catch (error) {
            console.error('Error fetching workouts:', error);
            setWorkouts([]); // Ensure workouts is always an array
        }
    };

    return (<div>
        <div style={{paddingLeft: '20px'}}>
            <Typography variant="h5" component="div" gutterBottom>
                Welcome to your workouts page!
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
                Here's what you can do:
                <ul>
                    <li>View all your workouts on this page.</li>
                    <li>Click on a workout to view detailed information about it.</li>
                </ul>
            </Typography>
        </div>
        {workouts.map((workout, index) => (workout.path && workout.path.length > 0 ? (
            <StyledCard key={index} sx={{minWidth: 275, marginBottom: 2}}>
                <Link to={`/WorkoutInfo/${workout._id}`} key={workout._id}>
                    <CardContent>
                        <StyledTypography variant="h5" component="div">
                            {workout.type}
                        </StyledTypography>
                        <StyledTypography color="text.secondary">
                            Date: {workout.date}
                        </StyledTypography>
                        <StyledTypography color="text.secondary">
                            Steps: {workout.steps}
                        </StyledTypography>
                        <MapContainer
                            style={{height: "400px", width: "100%"}}
                            center={{lat: workout.path[0].latitude, lng: workout.path[0].longitude}}
                            zoom={18}
                            eventHandlers={{
                                click: (event) => {
                                    event.originalEvent.stopPropagation();
                                },
                            }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Polyline
                                positions={workout.path.map(({latitude, longitude}) => [latitude, longitude])}
                                color="red"
                            />
                        </MapContainer>
                    </CardContent>
                </Link>
            </StyledCard>) : null))}
    </div>);
}

export default Workouts;