import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



const PieChart3D = () => {
    const options = {
        chart: {
            type: 'pie'
        },
        title: false,

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
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox', 45.0],
                ['IE', 26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari', 8.5],
                ['Opera', 6.2],
                ['Others', 0.7]
            ]
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

export default PieChart3D;
