import React from 'react';
import { Line } from 'react-chartjs-2'
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sale',
            fill: false,
            lineTension: 0.3,
            backgroundColor: '#ff5e62',
            borderColor: '#ff5e62',
            borderWidth: 1,
            borderDash: [5, 4],
            pointBackgroundColor: '#ff5e62',
            pointHoverRadius: 3,
            pointHoverBorderWidth: 1,
            pointRadius: 2,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
            label: 'Order',
            fill: false,
            lineTension: 0.3,
            backgroundColor: '#6fac85',
            borderColor: '#6fac85',
            borderWidth: 1,
            borderDash: [4, 4],
            pointBackgroundColor: '#6fac85',
            pointHoverRadius: 2,
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [5, 7, 54, 32, 87, 45, 25],
        },
        {
            label: 'Pending',
            fill: false,
            lineTension: 0.3,
            backgroundColor: '#ff9966',
            borderColor: '#ff9966',
            borderWidth: 1,
            pointBackgroundColor: '#ff9966',
            pointHoverRadius: 5,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 10,
            data: [25, 54, 2, 48, 78, 54, 35],
        },
        {
            label: 'Active',
            fill: false,
            lineTension: 0.3,
            backgroundColor: '#8fd3f4',
            borderColor: '#8fd3f4',
            borderWidth: 1,
            pointBackgroundColor: '#8fd3f4',
            pointHoverRadius: 6,
            pointHoverBorderWidth: 1,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [52, 47, 45, 4, 58, 7, 45],
        },
    ],
};

const options = {
    legend: {
        position: 'bottom',
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: '#EAEAF5',
                    borderDash: [3, 3],
                },
                ticks: {
                    fontColor: '#708093',
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    color: '#EAEAF5',
                    borderDash: [3, 3],
                },
                ticks: {
                    fontColor: '#708093',
                },
            },
        ],
    },
};
const LineChart = () => {
    return (
        <Line data={data} options={options} />
    );
}

export default LineChart;