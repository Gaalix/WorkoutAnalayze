import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Grid, Box, LinearProgress, Button } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { styled } from '@mui/system';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function WorkoutInfo() {
    const [showGraph, setShowGraph] = useState(false); 

    const [workout, setWorkout] = useState(null);
    const [averageData, setAverageData] = useState(null);
    const { workoutId } = useParams();

    useEffect(() => {
        const fetchWorkoutsAndCalculateAverage = async () => {
            const response = await fetch('https:/raziprojekt.azurewebsites.net/workouts/');
            const workouts = await response.json();
            if (workouts.length > 0) {
                const sumData = workouts.reduce((acc, workout) => {
                    return {
                        duration: acc.duration + workout.duration,
                        totalDistance: acc.totalDistance + workout.totalDistance,
                        pace: acc.pace + workout.pace,
                        steps: acc.steps + workout.steps,
                        burntCalories: acc.burntCalories + workout.burntCalories,
                    };
                }, { duration: 0, totalDistance: 0, pace: 0, steps: 0, burntCalories: 0 });
    
                const averages = {
                    duration: sumData.duration / workouts.length,
                    totalDistance: sumData.totalDistance / workouts.length,
                    pace: sumData.pace / workouts.length,
                    steps: sumData.steps / workouts.length,
                    burntCalories: sumData.burntCalories / workouts.length,
                };
    
                setAverageData(averages);
            }
        };
    
        const fetchWorkout = async () => {
            const response = await fetch(`https:/raziprojekt.azurewebsites.net/workouts/${workoutId}`);
            const data = await response.json();
            setWorkout(data);
        };
    
        fetchWorkout();
        fetchWorkoutsAndCalculateAverage();
    }, [workoutId]);

    const StyledTypography = styled(Typography)({
        fontSize: 14,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // underline with fading gray
        marginBottom: 12,
        fontWeight: 'bold',
      });

    if (!workout || !averageData) {
        return <Typography>Loading...</Typography>;
    }

    const data = {
        labels: ['Duration', 'Total Distance', 'Pace', 'Steps', 'Burnt Calories'],
        datasets: [
            {
                label: 'Your Workout',
                data: [workout.duration, workout.totalDistance, workout.pace, workout.steps, workout.burntCalories],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Average',
                data: [averageData.duration, averageData.totalDistance, averageData.pace, averageData.steps, averageData.burntCalories],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Workout Details
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
                <Button variant="contained" onClick={() => setShowGraph(!showGraph)}>
                    {showGraph ? 'Show Info' : 'Show Graph'}
                </Button>
            </Box>
            {!showGraph ? (
                <Grid container spacing={2}>
                    {/* Display workout details as text */}
                    <Grid item xs={12}>
                    <StyledTypography variant="h5" component="div">
                            {workout.type}
                        </StyledTypography>
                        <StyledTypography color="text.secondary">
                            Duration: {workout.duration} seconds
                        </StyledTypography>
                        <StyledTypography color="text.secondary">
                            Date: {workout.date}
                        </StyledTypography>
                        <StyledTypography color="text.secondary">
                            Distance: {workout.totalDistance} meters
                        </StyledTypography>
                        <StyledTypography color="text.secondary">
                            Steps: {workout.steps}
                        </StyledTypography>
                        <StyledTypography color="text.secondary">
                            Pace: {workout.pace} m/s
                        </StyledTypography>
                        <StyledTypography color="text.secondary">
                            Calories burnt: {workout.burntCalories} kcal
                        </StyledTypography>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {/* Display workout details as graph */}
                    <Grid item xs={12} style={{ textAlign: 'center', margin: '20px 0' }}>
                        <Typography variant="h6" component="h2" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                            Workout Compared to the Average
                        </Typography>
                        <Bar options={{ responsive: true }} data={data} />
                    </Grid>
                </Grid>
            )}
        </Paper>
    );
}

export default WorkoutInfo;