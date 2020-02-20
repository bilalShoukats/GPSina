import React from 'react';
import ReactHighmaps from 'react-highcharts/ReactHighmaps.src';
import maps from 'utils/json/world';
import data from 'utils/json/world.json';

const config = {
    chart: {
        spacingBottom: 20,
        backgroundColor: 'transparent',
        fill: '#444',
        style: {
            fontFamily: '\'Roboto\', sans-serif',
            height: '460px',
        },
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom',
            theme: {
                fill: 'transparent',
                'stroke-width': 1,
                r: 0,
            },
            style: {
                color: '#343a40',
            },
        },
    },

    exporting: {
        allowHTML: true,
    },

    title: {
        style: { display: 'none' },
    },

    legend: {
        enabled: false,
    },

    plotOptions: {
        map: {
            joinBy: ['iso-a2', 'code'],
            mapData: maps,
        },
    },
    tooltip: {
        headerFormat: 'Our User',
        borderWidth: 2,
        shadow: true,
        borderRadius: 5,
        pointFormat: '<br>{point.name}: <b>{point.value}</b>'
    },
    colorAxis: {
        min: 1,
        max: 1000,
        type: 'logarithmic',
    },

    series: [{
        data,
        states: {
            hover: {
                color: '#000',
            },
        },
    }],
};


const BasicVectorMap = () => {
    return (
        <ReactHighmaps config={config} />
    );
}
export default BasicVectorMap;
