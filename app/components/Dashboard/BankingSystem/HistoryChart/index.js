import React from 'react'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Card from '../../../Card'
import { Grid } from '@material-ui/core'

import './style.scss';

const data = [
  {
    name: 'Jan', Spending: 500, Saving: 240,
  },
  {
    name: 'Feb', Spending: 300, Saving: 139,
  },
  {
    name: 'Mar', Spending: 200, Saving: 980,
  },
  {
    name: 'Apr', Spending: 278, Saving: 390,
  },
  {
    name: 'May', Spending: 189, Saving: 260,
  },
  {
    name: 'Jun', Spending: 239, Saving: 150,
  },
  {
    name: 'Jul', Spending: 349, Saving: 300,
  },
  {
    name: 'Aug', Spending: 349, Saving: 250,
  },
  {
    name: 'Sep', Spending: 349, Saving: 150,
  },
  {
    name: 'Oct', Spending: 349, Saving: 330,
  },
  {
    name: 'Nov', Spending: 349, Saving: 130,
  },
  {
    name: 'Dec', Spending: 349, Saving: 230,
  },
];
const HistoryChart = () => {
  return (
    <Card title="History Chart">
      <Grid className="responsiveRechart respengage">
        <ResponsiveContainer>
          <BarChart
            data={data}
          >
            <XAxis axisLine={false} tickLine={false} tickMargin={10} dataKey="name" tick={{ fill: '#878AA0', fontSize: '14px' }} />
            <Tooltip cursor={{fill: '#f9f9f9'}}/>
            <Legend align="right" verticalAlign="top" margin={{ bottom: 0 }} />
            <Bar dataKey="Saving" stackId="a" background={{ fill: '#F5F6FD' }} barSize={5} fill="#0EB7FE" />
            <Bar dataKey="Spending" stackId="a" barSize={5} fill="#3B53DB" />
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Card>
  )
}
export default HistoryChart;
