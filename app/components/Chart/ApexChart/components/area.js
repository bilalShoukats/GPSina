import React from 'react';
import ReactApexChart from 'react-apexcharts'

const options = {
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },

    colors: ['#FE0E62', '#5F58FF', '#00C0CE'],

    xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00",
            "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00",
            "2018-09-19T06:30:00"
        ],
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    }
}
const series = [{
    name: 'Series 1',
    data: [80, 50, 30, 40, 100, 20],
}, {
    name: 'Series 2',
    data: [20, 30, 40, 80, 20, 80],
}, {
    name: 'Series 3',
    data: [44, 76, 78, 13, 43, 10],
}]

const ApexAreaChart = () => {
    return (
        <ReactApexChart
            options={options}
            series={series}
            type="area"
            height="350"
        />
    );
}

export default ApexAreaChart;
