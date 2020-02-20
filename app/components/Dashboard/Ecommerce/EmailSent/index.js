import React from 'react';
import ReactApexChart from 'react-apexcharts'
import Card from "../../../Card";

import './style.scss';

const data = [
  {
    name: 'Sent',
    value: '77',
    color: '#3B53DB',
    id: 1,
    mb: '20px'
  },
  {
    name: 'Read',
    value: '47',
    color: '#F1682C',
    id: 2,
    mb: '20px'
  },
  {
    name: 'Unread',
    value: '21',
    color: '#0EB7FE',
    id: 3
  },
];

const options = {
  labels: ['Sent', 'Read', 'Unread',],

  // stroke: {
  //   lineCap: "round",
  // },
  colors: ['#0EB7FE', '#F1682C', '#3B53DB'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#0EB7FE", '#F1682C', '#3B53DB'],
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
      size: 200,
      inverseOrder: true,
      startAngle: 0,
      endAngle: 360,
      offsetX: 0,
      offsetY: 0,
      hollow: {
        margin: 5,
        size: '30%',
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
        strokeWidth: '100%',
        opacity: 1,
        margin: 15,
        dropShadow: {
          enabled: false,
          top: 0,
          left: 0,
          blur: 0,
          opacity: 0.9
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
          },
          radialBar: {
            size: 120,
          }
        },
      }
    }
  ]
};
const series = [30, 60, 85,];

const EmailSent = () => {
  return (
    <Card title="Email Sent">
      <ReactApexChart
        className="emailPieChart"
        options={options}
        series={series}
        type="radialBar"
      />

      <ul className="emailList">
        {data.map((item, i) => (
          <li key={i} style={{marginBottom: item.mb}}>
            <h3><span style={{background: item.color}}></span> {item.value}% {item.name}</h3>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default EmailSent;
