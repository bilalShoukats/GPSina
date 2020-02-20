import React, {PureComponent} from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {Grid} from '@material-ui/core'
import Card from '../../../Card';

const data = [
  {
    name: 'Jan', earning: 100,
  },
  {
    name: 'Feb', earning: 100,
  },
  {
    name: 'Mar', earning: 100,
  },
  {
    name: 'Apr', earning: 78,
  },
  {
    name: 'May', earning: 89,
  },
  {
    name: 'Jun', earning: 39,
  },
  {
    name: 'Jul', earning: 20,
  },
  {
    name: 'Aug', earning: 20,
  },
  {
    name: 'Sep', earning: 80,
  },
  {
    name: 'Oct', earning: 49,
  },
  {
    name: 'Nov', earning: 90,
  },
  {
    name: 'Dec', earning: 50,
  },
];

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

const Earning = () => {
  return (
    <Card title="Earning">
      <Grid className="responsiveRechart">
        <ResponsiveContainer>
          <BarChart
            data={data}
          >
            <CartesianGrid vertical={false} stroke="#f9f9f9" strokeDasharray="0"/>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10}
                   tick={{fill: '#878AA0', fontSize: '14px'}}/>
            <YAxis tick={<CustomizedAxisTick/>} axisLine={false} tickLine={false} tickMargin={10}/>
            <Tooltip cursor={{fill: '#f9f9f9'}}/>
            <Bar name="Earning" dataKey="earning" stackId="a" barSize={5} fill="#BD20D3"/>
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Card>
  )
};

export default Earning
