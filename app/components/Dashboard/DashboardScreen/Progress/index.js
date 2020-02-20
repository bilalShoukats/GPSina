import React, {PureComponent} from 'react';
import {Tooltip, Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend} from 'recharts';
import {Grid} from '@material-ui/core'
import Card from "../../../Card";

import './style.scss';

const line = [
  {name: 'Sat', conversion: 40},
  {name: 'Sun', conversion: 30},
  {name: 'Mon', conversion: 27},
  {name: 'Tue', conversion: 18},
  {name: 'Wed', conversion: 23},
  {name: 'Thu', conversion: 40},
  {name: 'Fri', conversion: 30},
];

const CustomTooltip = ({active, payload, label}) => {
  if (active) {
    return (
      <div className="custom-tooltip-blue">
        <h4 className="label">{payload[0].value}%</h4>
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

const Progress = () => {
  return (
    <Card title='Progress'>
      <Grid className="lineRechart">
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
            <Line type="monotone"
                  dataKey="conversion"
                  stroke="#0EB7FE"
                  strokeWidth={4}
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

export default Progress
