import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Card from '../../../Card';
import {Grid} from '@material-ui/core'

import './style.scss';

const data = [
  {
    name: 'Open',
    value: '47',
    color: '#0EB7FE',
    id: 1,
    mb: '20px'
  },
  {
    name: 'To Do',
    value: '11',
    color: '#3B53DB',
    id: 2,
    mb: '20px'
  },
  {
    name: 'In Progress',
    value: '24',
    color: '#F1682C',
    id: 3
  },
  {
    name: 'Close',
    value: '18',
    color: '#BD20D3',
    id: 4
  },
];

const options = {
  title: false,
  tooltip: {
    headerFormat: '',
    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name} : {point.y}</b><br/>'
  },
  chart: {
    renderTo: 'container',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    height: '250px',
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      }
    },
    showInLegend: false
  },
  legend: {
    enabled: true,
    align: 'right',
    verticalAlign: 'middle',
    layout: 'vertical'
  },
  series: [{
    minPointSize: 0,
    // innerSize: '75%',
    zMin: 0,
    name: 'variablepie',
    type: 'pie',
    data: [{
      name: 'Open',
      y: 47,
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
        },
        stops: [
          [0, '#F1682C']
        ]
      },
    }, {
      name: 'To Do',
      y: 11,
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
        },
        stops: [
          [0, '#BD20D3']
        ]
      },
    }, {
      name: 'In Progress',
      y: 24,
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
        },
        stops: [
          [0, '#3B53DB']
        ]
      },
    }, {
      name: 'Close',
      y: 18,
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
        },
        stops: [
          [0, '#0EB7FE']
        ]
      },
    }]
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
};

const Summary = () => {
  return (
    <Card title="Summary">
      <Grid className="clientsSatWrap">
        <HighchartsReact
          highcharts={Highcharts}
          allowChartUpdate
          immutable={false}
          updateArgs={[true, true, true]}
          containerProps={{className: 'chartContainer'}}
          options={options}
        />
      </Grid>
      <ul className="sessionList">
        {data.map((item, i) => (
          <li key={i} style={{marginBottom: item.mb}}>
            <h3><span style={{background: item.color}}></span> {item.value}%</h3>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
};

export default Summary;
