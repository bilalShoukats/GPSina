/* eslint-disable no-underscore-dangle,react/no-did-mount-set-state */
import React, { PureComponent } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const initialState = {
    labels: ['Jan', 'Feb', 'mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'All user',
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

    componentDidMount() {
        const _this = this;

        const intervalId = setInterval(() => {
            const oldDataSet = _this.state.data.datasets[0];
            const newData = [];

            for (let x = 0; x < _this.state.data.labels.length; x += 1) {
                newData.push(Math.floor(Math.random() * 100));
            }

            const newDataSet = {
                ...oldDataSet,
            };

            newDataSet.data = newData;

            const newState = {
                ...initialState,
                data: {
                    datasets: [newDataSet],
                    labels: _this.state.data.labels,
                },
            };

            _this.setState(newState);
        }, 4000);

        this.setState({ intervalId });
    }

    componentWillUnmount() {
        const { intervalId } = this.state;
        clearInterval(intervalId);
    }

    render() {
        const { data } = this.state;
        return (
            <Bar data={data} options={options} />
        );
    }
}

export default BarChart;
