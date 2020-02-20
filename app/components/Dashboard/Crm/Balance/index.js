import React, {PureComponent} from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {Grid} from '@material-ui/core'
import Card from '../../../Card';

const data = [
  {
    name: 'Jan', Income: 100, Borrow: 50,
  },
  {
    name: 'Feb', Income: 100, Borrow: 30,
  },
  {
    name: 'Mar', Income: 100, Borrow: 20,
  },
  {
    name: 'Apr', Income: 78, Borrow: 28,
  },
  {
    name: 'May', Income: 89, Borrow: 19,
  },
  {
    name: 'Jun', Income: 39, Borrow: 29,
  },
  {
    name: 'Jul', Income: 20, Borrow: 40,
  },
  {
    name: 'Aug', Income: 20, Borrow: 30,
  },
  {
    name: 'Sep', Income: 80, Borrow: 40,
  },
  {
    name: 'Oct', Income: 49, Borrow: 39,
  },
  {
    name: 'Nov', Income: 90, Borrow: 40,
  },
  {
    name: 'Dec', Income: 50, Borrow: 10,
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

const Balance = () => {
  return (
    <Card title="Cypto Trading">
      <Grid className="responsiveRechart">
        <ResponsiveContainer>
          <BarChart
            data={data}
          >
            <CartesianGrid vertical={false} stroke="#f9f9f9" strokeDasharray="0"/>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10}
                   tick={{fill: '#878AA0', fontSize: '14px'}}/>
            <YAxis tick={<CustomizedAxisTick/>} axisLine={false} tickLine={false} tickMargin={10}/>
            <Legend align="right" verticalAlign="top"/>
            <Tooltip cursor={{fill: '#f9f9f9'}}/>
            <Bar dataKey="Income" stackId="a" barSize={5} fill="#0EB7FE"/>
            <Bar dataKey="Borrow" stackId="a" barSize={5} fill="#3B53DB"/>
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Card>
  )
};

export default Balance
