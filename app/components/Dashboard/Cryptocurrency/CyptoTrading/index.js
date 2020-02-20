import React, {PureComponent} from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {Grid} from '@material-ui/core'
import Card from '../../../Card';

const data = [
  {
    name: 'Jan', btc: 100, eth: 50, ltc: 50,
  },
  {
    name: 'Feb', btc: 100, eth: 30, ltc: 30,
  },
  {
    name: 'Mar', btc: 100, eth: 20, ltc: 20,
  },
  {
    name: 'Apr', btc: 78, eth: 28, ltc: 27,
  },
  {
    name: 'May', btc: 89, eth: 19, ltc: 18,
  },
  {
    name: 'Jun', btc: 39, eth: 29, ltc: 23,
  },
  {
    name: 'Jul', btc: 20, eth: 40, ltc: 42,
  },
  {
    name: 'Aug', btc: 20, eth: 30, ltc: 32,
  },
  {
    name: 'Sep', btc: 80, eth: 40, ltc: 48,
  },
  {
    name: 'Oct', btc: 49, eth: 39, ltc: 34,
  },
  {
    name: 'Nov', btc: 90, eth: 40, ltc: 49,
  },
  {
    name: 'Dec', btc: 50, eth: 10, ltc: 15,
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

const CyptoTrading = () => {
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
            <Bar name="BTC" dataKey="btc" stackId="a" barSize={5} fill="#3B53DB"/>
            <Bar name="ETH" dataKey="eth" stackId="a" barSize={5} fill="#0EB7FE"/>
            <Bar name="LTC" dataKey="ltc" stackId="a" barSize={5} fill="#F1682C"/>
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Card>
  )
};

export default CyptoTrading
