import React, { Component } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mapData from 'utils/maps_data'
import { toast } from 'react-toastify'
require("highcharts/modules/map")(Highcharts);

class NormalVectorMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapData: null
        };
        this.mapData = new mapData();
        this.options = {
            title: false,
            chart: {
                backgroundColor: "#fff",
                type: "map",
                map: null,
                height: '320px',
            },
            mapNavigation: {
                enabled: true,
                enableButtons: false
            },
            credits: {
                enabled: false
            },
            colorAxis: {
                dataClasses: [
                    {
                        from: 1,
                        color: "#604BFE",
                        name: "Company"
                    }
                ]
            },
            tooltip: {
                pointFormatter: function () {
                    return this.name;
                }
            },
            legend: {
                align: "center",
                verticalAlign: "middle",
                x: 0,
                y: 70,
                floating: true,
                valueDecimals: 1,
                backgroundColor: "rgba(96, 75, 254, .3)",
            },
            series: [
                {
                    name: "Country",
                    dataLabels: {
                        enabled: true,
                        color: "#604BFE",
                        format: "{point.postal-code}",
                        style: {
                            textTransform: "uppercase",
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        ySuffix: " %"
                    },
                    cursor: "pointer",
                    joinBy: ["iso-a2", "code"],
                    data: [],
                    point: {
                        events: {
                            click: function (r) {
                                toast.info(r.point.name)
                            }
                        }
                    }
                }
            ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: '767px'
                    },
                    chartOptions: {
                        height: '200px',
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
        };

        this.mapData.getWorld().then(r => {
            this.setState({ mapData: r.data }, () => {
                this.options.series[0].data = [];
                this.options["chart"]["map"] = this.state.mapData;

                for (let i in this.state.mapData["features"]) {
                    let mapInfo = this.state.mapData["features"][i];
                    if (mapInfo["id"]) {
                        var postalCode = mapInfo["id"];

                        var name = mapInfo["properties"]["name"];
                        var value = (i % 2) + 1;
                        var type = value === 1 ? "widget name one" : "widget name two";
                        var row = i;
                        this.options.series[0].data.push({
                            value: value,
                            name: name,
                            code: postalCode,
                            row: row,
                            type: type
                        });
                    }
                }
                this.setState({ mapOptions: this.options });
            });
        });
    }

    render() {
        return (
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={"mapChart"}
                options={this.state.mapOptions}
            />
        )
    }
}
export default NormalVectorMap;


