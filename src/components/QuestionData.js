import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import {Typography} from "@mui/material";

Chart.register(...registerables);

function WorkoutData() {
    const chartRef = useRef(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://raziprojekt.azurewebsites.net/questions/')
            .then(response => response.json())
            .then(fetchedData => {
                const labels = ['Difficulty', 'Enjoyment', 'Exhaustion', 'Motivation', 'Stress'];
                const dataSets = labels.map((label, index) => {
                    return {
                        label: label,
                        data: fetchedData.map(item => item[label.toLowerCase()]),
                        backgroundColor: `rgba(${index * 50},${index * 50},  ${index * 50}, 0.5)`, // Customize each color
                        borderColor: `rgba(${index * 50}, 192, 192, 1)`, // Border color for better visualization
                        borderWidth: 1,
                    };
                });

                const chartData = {
                    labels: fetchedData.map((_, index) => `Workout ${index + 1}`),
                    datasets: dataSets,
                };
                setData(chartData);
            });
    }, []);

    useEffect(() => {
        if (data && chartRef.current) {
            const chartInstance = new Chart(chartRef.current.getContext('2d'), {
                type: 'radar',
                data: data,
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Workout Feedback Radar Chart'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                                }
                            }
                        }
                    }
                }
            });

            return () => chartInstance.destroy();
        }
    }, [data]);

    return (
        <div>
            <div style={{paddingLeft: '20px'}}>
                <Typography variant="h5" component="div" gutterBottom>
                    Welcome to your workout data page!
                </Typography>
                <Typography variant="body1" component="div" gutterBottom>
                    Here's what you can do:
                    <ul>
                        <li>View your workout feedback in a radar chart.</li>
                        <li>Each axis represents a different feedback category.</li>
                        <li>The further from the center a point is on an axis, the higher the feedback score for that category.</li>
                    </ul>
                </Typography>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-1/4 h-1/4">
                    <canvas ref={chartRef} style={{ width: "700px", height: "700px" }}></canvas>
                </div>
            </div>
        </div>
    );
}

export default WorkoutData;
