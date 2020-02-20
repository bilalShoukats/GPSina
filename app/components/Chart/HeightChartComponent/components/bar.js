import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



const BarChart = () => {
    const options = {
        chart: {
            type: 'column'
        },
        title: false,
        subtitle: false,
        xAxis: {
            gridLineColor: '#DCE0EE',
            gridLineDashStyle: 'solid',
            gridLineWidth: 0,
            crosshair: true,
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            labels: {
                style: {
                    color: '#676B79',
                    fontSize: '14px',
                    fontWeight: "400",
                }
            },
            lineColor: '#EAEAF5',
            lineWidth: 1,
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: "#676B79",
                fontSize: "14px",
                fontWeight: "400",
            },

            itemHoverStyle: {
                color: "#0171F5",
            },
        },
        yAxis: {
            min: 0,
            title: false,
            gridLineColor: '#DCE0EE',
            gridLineWidth: 1,
            labels: {
                style: {
                    color: '#676B79',
                    fontSize: '14px',
                    fontWeight: "400",
                },
                formatter: function () {
                    return this.value + ' km';
                }
            }
        },
        tooltip: {
            className: 'heighChartTooltip',
            headerFormat: '<h4 className="tooltipTitle">{point.key}</h4><ul className="chatTooltip">',
            pointFormat: '<li><span style="color:{series.color};padding:0">{series.name}: </span>' +
                '<span style="padding:0"><b>{point.y:.1f} $</b></span></li>',
            footerFormat: '</ul>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'London',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
            name: 'Berlin',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 'auto'
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        }
    }
    return (
        <HighchartsReact
            highcharts={Highcharts}
            allowChartUpdate
            immutable={false}
            updateArgs={[true, true, true]}
            containerProps={{ className: 'chartContainer' }}
            options={options}
        />
    );
}

export default BarChart;
