import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import { Grid, Button, TextField } from '@material-ui/core'
import './style.scss'


import { pricings } from 'json/pricing'
const PricingTable = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Pricing Table</title>
            </Helmet>
            <Grid container spacing={2}>
                {pricings.map((pricing, i) => (
                    <Grid key={i} item lg={3}>
                        <Grid className="pricingTableWrapper">
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
                <Grid item lg={2}></Grid>
                <Grid item lg={8}>
                    <Grid container className="mt50">
                        {pricings.slice(0, 3).map((pricing, i) => (
                            <Grid key={i} item lg={4}>
                                <Grid className={pricing.label ? 'pricingTableWrapper pricingTableWrapperStyleTwo' : 'pricingTableWrapper'}>
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
