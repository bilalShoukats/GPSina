import React from 'react';
import ReactApexChart from 'react-apexcharts'

const options = {
    labels: ['Google', 'Whatsapp', 'Facebook',],
    radialBar: {
        dataLabels: {
            name: {
                fontSize: '18px',
            },
            value: {
                fontSize: '16px',
            },
            total: {
                show: true,
                label: 'Total',
                formatter: function (w) {
                    return 249
                }
            }
        }
    },

    stroke: {
        lineCap: "round",
    },
    colors: ['#FE0E62', '#5F58FF', '#00C0CE'],
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#C044FA", '#D7CBFF', '#00E31D'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: []
        }
    },
    dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.5
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
                show: true,
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
const series = [80, 75, 85,]

const ApexRadialChart = () => {
    return (
        <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            height="350"
        />
    );
}

export default ApexRadialChart;
