import React from 'react';
import Grid from "@material-ui/core/Grid";

import icon1 from '../../../../images/featured/ecystem-icon1.png';
import icon2 from '../../../../images/featured/ecystem-icon2.png';
import icon3 from '../../../../images/featured/ecystem-icon3.png';
import icon4 from '../../../../images/featured/ecystem-icon4.png';

import './style.scss';

const feature = {
  sale: {
    icon: icon1,
    title: 'Total Sale',
    value: '46,527',
  },
  visitors: {
    icon: icon2,
    title: 'Visitors',
    value: '1,34,796',
  },
  new_orders: {
    icon: icon3,
    title: 'New Orders',
    value: '6,743',
  },
  customers: {
    icon: icon4,
    title: 'Customers',
    value: '1,694',
  },
};

const EcommerceFeatured = () => {

  const {sale, visitors, new_orders, customers} = feature;

  return (
    <Grid container spacing={3}>
      <Grid item lg={3} sm={6} xs={12}>
        <Grid className="ecFeatureItem">
          <Grid className="icon">
            <img src={sale.icon} alt="icon"/>
          </Grid>
          <Grid className="content">
            <p>{sale.title}</p>
            <h2>${sale.value}</h2>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <Grid className="ecFeatureItem">
          <Grid className="icon">
            <img src={visitors.icon} alt="icon"/>
          </Grid>
          <Grid className="content">
            <p>{visitors.title}</p>
            <h2>${visitors.value}</h2>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <Grid className="ecFeatureItem">
          <Grid className="icon">
            <img src={new_orders.icon} alt="icon"/>
          </Grid>
          <Grid className="content">
            <p>{new_orders.title}</p>
            <h2>{new_orders.value}</h2>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <Grid className="ecFeatureItem">
          <Grid className="icon">
            <img src={customers.icon} alt="icon"/>
          </Grid>
          <Grid className="content">
            <p>{customers.title}</p>
            <h2>{customers.value}</h2>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default EcommerceFeatured;
