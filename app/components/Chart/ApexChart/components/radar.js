import React from 'react';
import ReactApexChart from 'react-apexcharts'

const options = {
    chart: {
        dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
        },
    },
    labels: ['Google', 'Whatsapp', 'Facebook',],
    colors: ['#FE0E62', '#5F58FF', '#00C0CE'],
    stroke: {
        width: 0
    },
    fill: {
        opacity: 0.4
    },
    markers: {
        size: 0
    },
    responsive: [
        {
            breakpoint: 767,
            options: {

                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                },
                legend: {
                    position: "bottom"
                }
            }
        }
    ]
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

const ApexRadarlChart = () => {
    return (
        <ReactApexChart
            options={options}
            series={series}
            type="radar"
            height="350"
        />
    );
}

export default ApexRadarlChart;
