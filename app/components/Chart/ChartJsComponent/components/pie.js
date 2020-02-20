import React, { PureComponent } from 'react';
import { Doughnut } from 'react-chartjs-2';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

const getState = () => ({
    labels: [
        'Sale',
        'User',
        'Active',
        'Pending',
    ],
    datasets: [{
        data: [getRandomInt(100, 200), getRandomInt(100, 250), getRandomInt(150, 350), getRandomInt(200, 450)],
        backgroundColor: [
            '#ff5e62',
            '#6fac85',
            '#ff9966',
            '#8fd3f4',
        ],
        hoverBackgroundColor: [
            '#ff5e62',
            '#6fac85',
            '#ff9966',
            '#8fd3f4',
        ],
        borderColor: '#EAEAF5',
    }],
});

class PieChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: getState(),
            intervalId: null,
        };
    }

    componentWillMount() {
        const intervalId = setInterval(() => {
            this.setState({ data: getState() });
        }, 4000);

        this.setState({ intervalId });
    }

    componentWillUnmount() {
        const { intervalId } = this.state;
        clearInterval(intervalId);
    }

    render() {

        const options = {
            legend: {
                position: 'bottom',
            },
        };
        const { data } = this.state;

        return (
            <Doughnut options={options} data={data} />
        );
    }
}

export default PieChart;
