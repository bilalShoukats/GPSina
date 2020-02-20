import React, {PureComponent} from 'react';
import {Tooltip, Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend} from 'recharts';
import {Grid} from '@material-ui/core'
import Card from "../../../Card";

import './style.scss';

const line = [
  {name: 'Jan', btc: 4000, eth: 400},
  {name: 'Feb', btc: 3000, eth: 3300},
  {name: 'Mar', btc: 2780, eth: 278},
  {name: 'Apr', btc: 1890, eth: 2189},
  {name: 'May', btc: 2390, eth: 1239},
  {name: 'Jun', btc: 4000, eth: 800},
  {name: 'Jul', btc: 3000, eth: 1300},
  {name: 'Aug', btc: 2780, eth: 2278},
  {name: 'Sep', btc: 4000, eth: 900},
  {name: 'Oct', btc: 3000, eth: 1000},
  {name: 'Nov', btc: 2780, eth: 2278},
  {name: 'Dec', btc: 1890, eth: 3189},
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
        <text x={0} y={0} dy={16} textAnchor="end" fontSize="14px" fill="#878AA0">{payload.value}%</text>
      </g>
    );
  }
}

const Comparison = () => {
  return (
    <Card title='Comparison'>
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
              name="BTC"
              type="monotone"
              dataKey="btc"
              stroke="#18A0FB"
              strokeWidth={5}
              strokeDasharray="1"
              dot={{strokeWidth: 0, r: 0}}
              activeDot={{stroke: "#ffffff", strokeWidth: 4, r: 7}}
            />
            <Line
              name="ETH"
              type="monotone"
              dataKey="eth"
              stroke="#3B53DB"
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

export default Comparison
