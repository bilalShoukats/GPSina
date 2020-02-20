import React, {PureComponent} from 'react';
import {Tooltip, Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend} from 'recharts';
import {Grid} from '@material-ui/core'
import Card from "../../../Card";

import './style.scss';

const line = [
  {name: 'Jan', sales: 30},
  {name: 'Feb', sales: 90},
  {name: 'Mar', sales: 80},
  {name: 'Apr', sales: 120},
  {name: 'May', sales: 90},
  {name: 'Jun', sales: 10},
  {name: 'Jul', sales: 60},
  {name: 'Aug', sales: 80},
  {name: 'Sep', sales: 100},
  {name: 'Oct', sales: 10},
  {name: 'Nov', sales: 80},
  {name: 'Dec', sales: 90},
];

const CustomTooltip = ({active, payload, label}) => {
  if (active) {
    return (
      <div className="custom-tooltip-blue">
        <h4 className="label">{payload[0].value} Sales</h4>
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
        <text x={0} y={0} dy={16} textAnchor="end" fontSize="14px" fill="#878AA0">{payload.value}M</text>
      </g>
    );
  }
}

const SalesStatistics = () => {
  return (
    <Card title='Sales Statistics'>
      <Grid className="salesLineRechart">
        <ResponsiveContainer>
          <LineChart
            data={line}
          >
            <CartesianGrid vertical={false} fillOpacity={1} stroke="#f9f9f9" strokeDasharray="0"/>
            <XAxis axisLine={false} tickMargin={10} tickLine={false} stroke="#708093" dataKey="name"/>
            <YAxis tick={<CustomizedAxisTick/>} axisLine={false} tickMargin={10} tickLine={false} stroke="#708093"/>
            <Tooltip offset={1} content={<CustomTooltip/>}/>
            <Line
              type="basis"
              dataKey="sales"
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

export default SalesStatistics
