import React from 'react';
import Grid from "@material-ui/core/Grid";

import icon1 from '../../../../images/featured/bsystem-icon1.png';
import icon2 from '../../../../images/featured/bsystem-icon2.png';
import icon3 from '../../../../images/featured/bsystem-icon3.png';
import icon4 from '../../../../images/featured/bsystem-icon4.png';

import './style.scss';

const feature = {
  avail: {
    icon: icon1,
    title: 'Available Balance',
    value: '61,832',
  },
  income: {
    icon: icon2,
    title: 'Income',
    value: '6,709',
  },
  tax: {
    icon: icon3,
    title: 'State Tax Return',
    value: '5.41',
  },
  trades: {
    icon: icon4,
    title: 'Open Trades',
    value: '32',
  },
};

const BankingSystemFeature = () => {

  const {avail, income, tax, trades} = feature;

  return (
    <Grid className="bankingSystemFeature">

      <Grid className="bsFeatureItem">
        <Grid className="icon">
          <img src={avail.icon} alt="icon"/>
        </Grid>
        <Grid className="content">
          <h2>${avail.value}</h2>
          <p>{avail.title}</p>
        </Grid>
      </Grid>

      <Grid className="bsFeatureItem">
        <Grid className="icon">
          <img src={income.icon} alt="icon"/>
        </Grid>
        <Grid className="content">
          <h2>${income.value}</h2>
          <p>{income.title}</p>
        </Grid>
      </Grid>

      <Grid className="bsFeatureItem">
        <Grid className="icon">
          <img src={tax.icon} alt="icon"/>
        </Grid>
        <Grid className="content">
          <h2>{tax.value}%</h2>
          <p>{tax.title}</p>
        </Grid>
      </Grid>

      <Grid className="bsFeatureItem">
        <Grid className="icon">
          <img src={trades.icon} alt="icon"/>
        </Grid>
        <Grid className="content">
          <h2>{trades.value}</h2>
          <p>{trades.title}</p>
        </Grid>
      </Grid>

    </Grid>
  )
};

export default BankingSystemFeature;
