import React from 'react';
import Grid from "@material-ui/core/Grid";
import './style.scss';

const features = [
  {
    icon: 'fa-bus',
    coin_type: 'Total Trips',
    value: '392',
  },
  {
    icon: 'fa-users',
    coin_type: 'Total Users',
    value: '22',
  },
  {
    icon: 'fa-car',
    coin_type: 'Total Vehicles',
    value: '12',
  },
  {
    icon: 'fa-male',
    coin_type: 'Total Drivers',
    value: '12',
  },
  {
    icon: 'fa-sign-in',
    coin_type: 'Total Fence In',
    value: '98',
  },
  {
    icon: 'fa-sign-out',
    coin_type: 'Total Fence Out',
    value: '32',
  },
  {
    icon: 'fa-road',
    coin_type: 'Total Routes',
    value: '52',
  },
  {
    icon: 'fa-car',
    coin_type: 'Pending Vehicles',
    value: '2',
  },
  {
    icon: 'fa-building',
    coin_type: 'Total Companies',
    value: '10',
  },
];

const CryptocurrencyFeatured = () => {
  return (
    <Grid container spacing={3}>
      {features.map((item, i) => {
        return (
          <Grid key={i} item lg={3} sm={6} xs={12}>
            <Grid className="crypFeatureItem">
              <Grid className="crypftop">
                <Grid className="icon">
                  <i className={`fa ${item.icon}`}></i>
                </Grid>
                <h4>{item.coin_type}</h4>
              </Grid>
              <h2>{item.value}</h2>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
};

export default CryptocurrencyFeatured;
