import React from 'react';
import Card from "../../../Card";
import Grid from "@material-ui/core/Grid";

import './style.scss';

const orders = [
  {
    title: 'Today',
    value: 314,
    bg_color: '#3B53DB'
  },
  {
    title: 'Shipped',
    value: 823,
    bg_color: '#BD20D3'
  },
  {
    title: 'Delivered',
    value: 416,
    bg_color: '#F1682C'
  },
  {
    title: 'Pending',
    value: 231,
    bg_color: '#0EB7FE'
  },
];

const Orders = () => {
  return (
    <Card title="Orders">
      <Grid className="ordersWrapper">
        <h2>Total 1,784</h2>

        <Grid className="orders">
          {orders.map((item, i) => {
            return (
              <Grid key={i} className="orderItem" style={{background: item.bg_color}}>
                <p>{item.title}</p>
                <h2>{item.value}</h2>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Card>
  )
};

export default Orders;
