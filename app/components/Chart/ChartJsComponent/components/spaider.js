import React from 'react';
import { Polar } from 'react-chartjs-2';

const data = {
    datasets: [{
        data: [11, 16, 10, 14],
        backgroundColor: ['#ff5e62', '#6fac85', '#ff9966', '#8fd3f4'],
        label: 'My dataset',
        borderColor: 'rgba(255,255,255,0.54)',
    }],
    labels: ['User', 'Active', 'Pending', 'Sale'],
};

const options = {
    legend: {
        position: 'bottom',
    },
    scale: {
        gridLines: {
            color: '#EAEAF5',
            borderDash: [3, 3],
        },
        ticks: {
            fontColor: '#708093',
        },
    },
};

const SpaideChart = () => (
    <Polar data={data} options={options} />
);

export default SpaideChart;
