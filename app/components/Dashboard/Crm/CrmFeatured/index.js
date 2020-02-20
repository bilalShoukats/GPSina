import React from 'react';
import Grid from "@material-ui/core/Grid";

import arr_green from '../../../../images/icons/crm_featured/arrow-up-right-green.png';
import arr_red from '../../../../images/icons/crm_featured/arrow-up-right-red.png';

import './style.scss';

const features = {
  borrowed: {
    title: 'Borrowed',
    amount: '6,74,925',
  },
  annual_profit: {
    title: 'Annual Profit',
    amount: '5,81,274',
  },
  lead_conversion: {
    title: 'Lead Conversion',
    amount: '61.27',
  },
  average_income: {
    title: 'Average Income',
    amount: '41,672',
  },
  annual_deals: {
    title: 'Annual Deals',
    amount: '13,872',
  },
};

const CrmFeatured = () => {

  const {borrowed, annual_profit, lead_conversion, average_income, annual_deals} = features;

  return (
    <Grid className="crmFeatured">
      <Grid className="crmFeaturedItem">
        <p>{borrowed.title}</p>
        <h4>${borrowed.amount} <img src={arr_green} alt="arr_green"/></h4>
      </Grid>
      <Grid className="crmFeaturedItem">
        <p>{annual_profit.title}</p>
        <h4>${annual_profit.amount} <img src={arr_red} alt="arr_green"/></h4>
      </Grid>
      <Grid className="crmFeaturedItem">
        <p>{lead_conversion.title}</p>
        <h4>{lead_conversion.amount}& <img src={arr_green} alt="arr_green"/></h4>
      </Grid>
      <Grid className="crmFeaturedItem">
        <p>{average_income.title}</p>
        <h4>{average_income.amount}<img src={arr_red} alt="arr_green"/></h4>
      </Grid>
      <Grid className="crmFeaturedItem">
        <p>{annual_deals.title}</p>
        <h4>${annual_deals.amount}<img src={arr_green} alt="arr_green"/></h4>
      </Grid>
    </Grid>
  )
};

export default CrmFeatured;
