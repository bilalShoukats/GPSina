/* eslint-disable no-underscore-dangle,react/no-did-mount-set-state */
import React, { PureComponent } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const initialState = {
  labels: ['Jan', 'Feb', 'mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Weekly Profile',
      backgroundColor: '#8fd3f4',
      borderColor: '#8fd3f4',
      borderWidth: 1,
      hoverBackgroundColor: '#8fd3f4',
      hoverBorderColor: '#8fd3f4',
      data: [65, 59, 80, 81, 56, 55, 45, 81, 56, 55, 45, 55],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'bottom',
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: '#EAEAF5',
          borderDash: [3, 3],
        },
        ticks: {
          fontColor: '#708093',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: '#EAEAF5',
          borderDash: [3, 3],
        },
        ticks: {
          fontColor: '#708093',
        },
      },
    ],
  },
};

class BarChart extends PureComponent {

  constructor() {
    super();
    this.state = {
      data: initialState,
      intervalId: null,
    };
  }

  componentDidUpdate() {

  }

  componentWillMount() {

  }

  componentDidMount() {
    const _this = this;

    const newData = [];
    const oldDataSet = _this.state.data.datasets[0];
    const labels = [];

    this.props.data.map((key, value) => {
      newData.push(key[1]);
      labels.push(key[0]);
    })

    const newDataSet = {
      ...oldDataSet,
    };

    console.log("new data set: ", newDataSet);

    newDataSet.data = newData;

    const newState = {
      ...initialState,
      data: {
        datasets: [newDataSet],
        labels: labels,
      },
    };

    _this.setState(newState);
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  render() {
    const { data } = this.state;
    return (
      <Bar
        width={100}
        data={data} options={options} />
    );
  }
}

export default BarChart;