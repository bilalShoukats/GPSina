import React, {PureComponent} from 'react';
import {Tooltip, Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend} from 'recharts';
import {Grid} from '@material-ui/core'
import Card from "../../../Card";

import './style.scss';

const line = [
  {name: 'Jan', income: 100, expense: 10},
  {name: 'Feb', income: 90, expense: 100},
  {name: 'Mar', income: 80, expense: 18},
  {name: 'Apr', income: 90, expense: 189},
  {name: 'May', income: 90, expense: 139},
  {name: 'Jun', income: 10, expense: 10},
  {name: 'Jul', income: 100, expense: 100},
  {name: 'Aug', income: 80, expense: 178},
  {name: 'Sep', income: 100, expense: 10},
  {name: 'Oct', income: 10, expense: 100},
  {name: 'Nov', income: 80, expense: 178},
  {name: 'Dec', income: 90, expense: 189},
];

const CustomTooltip = ({active, payload, label}) => {
  if (active) {
    return (
      <div className="custom-tooltip-blue">
        <h4 className="label">BTC: {payload[0].value}%</h4>
        <h4 className="label2">ETH: {payload[1].value}%</h4>
      </div>
    );
  }
  return null;
};

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fontSize="14px" fill="#878AA0">{payload.value}K</text>
      </g>
    );
  }
}

const BalanceStatistics = () => {
  return (
    <Card title='Balance Statistics'>
      <Grid className="lineRechart comparisionChart">
        <ResponsiveContainer>
          <LineChart
            data={line}
          >
            {/* verticalFill={['#555555', '#444444']} */}
            <CartesianGrid vertical horizontal={false} fillOpacity={1} stroke="#f9f9f9" strokeDasharray="0"/>
            <XAxis axisLine={false} tickMargin={10} tickLine={false} stroke="#708093"
                   dataKey="name"/>
            <YAxis tick={<CustomizedAxisTick/>} axisLine={false} tickMargin={10} tickLine={false} stroke="#708093"/>
            <Tooltip offset={1} content={<CustomTooltip/>}/>
            <Legend verticalAlign="top" align="right"/>
            <Line
              name="Income"
              type="basis"
              dataKey="income"
              stroke="#0EB7FE"
              strokeWidth={5}
              strokeDasharray="1"
              dot={{strokeWidth: 0, r: 0}}
              activeDot={{stroke: "#ffffff", strokeWidth: 4, r: 7}}
            />
            <Line
              name="Expense"
              type="basis"
              dataKey="expense"
              stroke="#F1682C"
              strokeWidth={5}
              strokeDasharray="1"
              dot={{strokeWidth: 0, r: 0}}
              activeDot={{stroke: "#ffffff", strokeWidth: 4, r: 7}}
            />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Card>
  );
};

export default BalanceStatistics
