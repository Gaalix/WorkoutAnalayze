import React, {useContext, useEffect, useRef, useState} from 'react';
import { Chart, registerables } from 'chart.js';
import { UserContext} from "../userContext";
import {Typography} from "@mui/material";

Chart.register(...registerables);

function WorkoutData() {
    const chartRef = useRef();
    const [data, setData] = useState();
    const [xAxis, setXAxis] = useState('duration'); // Default x-axis
    const [yAxis, setYAxis] = useState('totalDistance'); // Default y-axis
    const { user,  } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            setData([]);
            return;
        }

        const fetchWorkouts = async () => {
            try {
                const response = await fetch(`https:/raziprojekt.azurewebsites.net/workouts/user/${user._id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    const chartData = {
                        datasets: data.map(item => ({
                            label: `Workout: ${item.type}`,
                            data: [{
                                x: item[xAxis], // Selected data on the x-axis
                                y: item[yAxis], // Selected data on the y-axis
                            }],
                            fill: false,
                            backgroundColor: item.type === 'running' ? 'rgba(255, 0, 0, 0.5)' : // Red for running
                                item.type === 'walking' ? 'rgba(0, 255, 255, 0.5)' : // Cyan for walking
                                    item.type === 'cycling' ? 'rgba(128, 0, 128, 0.5)' : // Purple for cycling
                                        'rgba(0, 0, 0, 0.5)', // Default color for other types

                            borderColor: item.type === 'running' ? 'rgba(255, 0, 0, 1)' : // Red for running
                                item.type === 'walking' ? 'rgba(0, 255, 255, 1)' : // Cyan for walking
                                    item.type === 'cycling' ? 'rgba(128, 0, 128, 1)' : // Purple for cycling
                                        'rgba(0, 0, 0, 1)', // Default color for other types type
                            borderWidth: 2,
                        })),
                    };
                    setData(chartData);
                } else {
                    console.error('Fetched data is not an array:', data);
                    setData([]); // Ensure data is always an array
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
                setData([]); // Ensure data is always an array
            }
        };

        fetchWorkouts();
    }, [xAxis, yAxis, user]);

    useEffect(() => {
        if (data) {
            const chartInstance = new Chart(chartRef.current.getContext('2d'), {
                type: 'scatter',
                data: data,
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Duration (seconds)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Total Distance (meters)'
                            }
                        }
                    },
                    
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    // Assuming context.raw is an object with all the data you want to display
                                    let label = '';
                                    for (const key in context.raw) {
                                        label += `${key}: ${context.raw[key]} `;
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });

            return () => chartInstance.destroy(); // Cleanup the chart on component unmount or data update
        }
    }, [data]);

    return (
        <div>
            <div style={{paddingLeft: '20px', paddingBottom: '20px'}}>
                <Typography variant="h5" component="div" gutterBottom>
                    Welcome to your workout data page!
                </Typography>
                <Typography variant="body1" component="div" gutterBottom>
                    The graph below shows your workouts. Each point represents a workout. The color of the point
                    indicates the type of the workout:
                    <ul>
                        <li><span style={{color: 'rgba(255, 0, 0, 1)'}}>Red</span>: Running</li>
                        <li><span style={{color: 'rgba(0, 255, 255, 1)'}}>Cyan</span>: Walking</li>
                        <li><span style={{color: 'rgba(128, 0, 128, 1)'}}>Purple</span>: Cycling</li>
                        <li><span style={{color: 'rgba(0, 0, 0, 1)'}}>Black</span>: Other types</li>
                    </ul>
                </Typography>
            </div>
            <select value={xAxis} onChange={e => setXAxis(e.target.value)}>
                <option value="duration">Duration</option>
                <option value="totalDistance">Total Distance</option>
                <option value="pace">Pace</option>
                <option value="burntCalories">Burnt Calories</option>
                {/* Add more options as needed */}
            </select>
            <select value={yAxis} onChange={e => setYAxis(e.target.value)}>
                <option value="duration">Duration</option>
                <option value="totalDistance">Total Distance</option>
                <option value="pace">Pace</option>
                <option value="burntCalories">Burnt Calories</option>
                {/* Add more options as needed */}
            </select>
            <div className="w-2/4 h-2/4">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default WorkoutData;
