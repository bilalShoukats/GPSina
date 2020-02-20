import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import messages from './messages';
import {Grid, Button, TextField} from '@material-ui/core'
import './style.scss'

import pricings from 'utils/json/pricing'

const PricingTable = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Pricing Table</title>
      </Helmet>
      <h2 className="breadcumbTitle">Pricing Table</h2>
      <Grid container spacing={3}>
        {pricings.map((pricing, i) => (
          <Grid key={i} item xl={3} md={6} sm={6} xs={12}>
            <Grid className="pricingTableWrapper">
              {pricing.label && <span className="badgePricing">
                                <span>{pricing.label}</span>
                            </span>}
              <h4>{pricing.title}</h4>
              <h2>{pricing.price} <strong>/</strong><span>{pricing.date}</span></h2>
              <ul>
                {pricing.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <Button
                variant="contained"
                className="btn bg-default btn-radius">Buy Now</Button>
            </Grid>
          </Grid>
        ))}
        <Grid item xl={2} xs={12}></Grid>
        <Grid item xl={8} xs={12}>
          <Grid container className="mt-50">
            {pricings.slice(0, 3).map((pricing, i) => (
              <Grid key={i} item lg={4} sm={6} xs={12}>
                <Grid
                  className={pricing.label ? 'pricingTableWrapper pricingTableWrapperStyleTwo' : 'pricingTableWrapper'}>
                  {pricing.label && <span className="badgePricing">
                                        <span>{pricing.label}</span>
                                    </span>}
                  <h4>{pricing.title}</h4>
                  <h2>{pricing.price} <span>{pricing.date}</span></h2>
                  <ul>
                    {pricing.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <Button
                    variant="contained"
                    className="btn bg-default btn-radius">Buy Now</Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(PricingTable);
