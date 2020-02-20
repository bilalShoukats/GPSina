import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


// json 
import data from 'utils/json/range.json'

const AreaRange = () => {
    const options = {
        chart: {
            type: 'arearange',
            zoomType: 'x',
            scrollablePlotArea: {
                minWidth: 600,
                scrollPositionX: 1
            }
        },
        title: false,
        subtitle: false,
        xAxis: {
            gridLineColor: '#DCE0EE',
            gridLineDashStyle: 'solid',
            gridLineWidth: 0,
            crosshair: true,
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
            spline: {
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                marker: {
                    enabled: false,
                    enabledThreshold: 4,
                    fillColor: "#fff",
                    height: 20,
                    width: 20,
                    lineColor: '#6A69FF',
                    lineWidth: 2,
                    radius: 4,
                }
            }
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'Temperatures',
            data: data
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

export default AreaRange;
