import React, {PureComponent} from 'react';
import {Tooltip, Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend} from 'recharts';
import {Grid} from '@material-ui/core'
import Card from "../../../Card";

import './style.scss';

const line = [
  {name: 'Jan', InstantIncome: 100, PredictIncome: 10},
  {name: 'Feb', InstantIncome: 90, PredictIncome: 100},
  {name: 'Mar', InstantIncome: 80, PredictIncome: 18},
  {name: 'Apr', InstantIncome: 90, PredictIncome: 189},
  {name: 'May', InstantIncome: 90, PredictIncome: 139},
  {name: 'Jun', InstantIncome: 10, PredictIncome: 10},
  {name: 'Jul', InstantIncome: 100, PredictIncome: 100},
  {name: 'Aug', InstantIncome: 80, PredictIncome: 178},
  {name: 'Sep', InstantIncome: 100, PredictIncome: 10},
  {name: 'Oct', InstantIncome: 10, PredictIncome: 100},
  {name: 'Nov', InstantIncome: 80, PredictIncome: 178},
  {name: 'Dec', InstantIncome: 90, PredictIncome: 189},
];

const CustomTooltip = ({active, payload, label}) => {
  if (active) {
    return (
      <div className="custom-tooltip-blue">
        <h4 className="label">$ {payload[0].value} M</h4>
        <h4 className="label2">$ {payload[1].value} M</h4>
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

const Income = () => {
  return (
    <Card title='Income'>
      <Grid className="incomeLineRechart">
        <ResponsiveContainer>
          <LineChart
            data={line}
          >
            <CartesianGrid vertical={false} fillOpacity={1} stroke="#f9f9f9" strokeDasharray="0"/>
            <XAxis axisLine={false} tickMargin={10} tickLine={false} stroke="#708093"
                   dataKey="name"/>
            <YAxis tick={<CustomizedAxisTick/>} axisLine={false} tickMargin={10} tickLine={false} stroke="#708093"/>
            <Tooltip offset={1} content={<CustomTooltip/>}/>
            <Legend verticalAlign="top" align="right"/>
            <Line
              type="basis"
              dataKey="InstantIncome"
              stroke="#0EB7FE"
              strokeWidth={5}
              strokeDasharray="1"
              dot={{strokeWidth: 0, r: 0}}
              activeDot={{stroke: "#ffffff", strokeWidth: 4, r: 7}}
            />
            <Line
              type="basis"
              dataKey="PredictIncome"
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

export default Income
