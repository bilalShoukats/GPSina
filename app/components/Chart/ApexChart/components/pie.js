import React from 'react';
import ReactApexChart from 'react-apexcharts'

const options = {
    labels: ['Google', 'Whatsapp', 'Facebook',],
    colors: ['#FE0E62', '#5F58FF', '#00C0CE'],
    dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.5
    },
    legend: {
        position: "bottom"
    },
    plotOptions: {
        radialBar: {
            size: 150,
            inverseOrder: true,
            startAngle: 0,
            endAngle: 360,
            offsetX: 0,
            offsetY: 0,
            hollow: {
                margin: 5,
                size: '50%',
                background: '#fff',
                imageClipped: true,
                position: 'front',
                dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 3,
                    opacity: 0.5
                }
            },
            track: {
                show: false,
                startAngle: undefined,
                endAngle: undefined,
                background: '#f2f2f2',
                strokeWidth: '70%',
                opacity: 1,
                margin: 5,
                dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 3,
                    opacity: 0.5
                }
            },
            dataLabels: {
                show: true,
                name: {
                    show: true,
                    fontSize: '20px',
                    offsetY: -10
                },
                value: {
                    show: true,
                    fontSize: '16px',
                    fontFamily: undefined,
                    color: undefined,
                    offsetY: 5,
                    formatter: function (val) {
                        return val + '%'
                    }
                },
            }
        }
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
const series = [100, 75, 85,]

const ApexRadialChart = () => {
    return (
        <ReactApexChart
            options={options}
            series={series}
            type="pie"
            height="350"
        />
    );
}

export default ApexRadialChart;
