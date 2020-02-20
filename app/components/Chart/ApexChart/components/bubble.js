import React from 'react';
import ReactApexChart from 'react-apexcharts'

const options = {
    dataLabels: {
        enabled: false
    },

    fill: {
        opacity: 0.8,
    },
    title: {
        text: ''
    },
    xaxis: {
        tickAmount: 6,
        type: 'category',
        axisBorder: {
            show: false,
        }
    },
    yaxis: {
        tickAmount: 4,
        max: 400
    },
    legend: {
        show: false,
    }
}
const series = [
    {
        name: 'Bubble1',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 1, {
            min: 100,
            max: 600
        })
    },
    {
        name: 'Bubble2',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 5, {
            min: 100,
            max: 600
        })
    },
    {
        name: 'Bubble3',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 3, {
            min: 100,
            max: 400
        })
    },
    {
        name: 'Bubble4',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 2, {
            min: 100,
            max: 600
        })
    }
]
function generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([x, y, z]);
        baseval += 86400000;
        i++;
    }
    return series;
}


const ApexBubbleChart = () => {
    return (
        <ReactApexChart
            options={options}
            series={series}
            type="bubble"
            height="350"
        />
    );
}

export default ApexBubbleChart;
