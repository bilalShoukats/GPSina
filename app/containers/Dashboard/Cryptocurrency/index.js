/**
 *
 * Cryptocurrency
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCryptocurrency from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Grid from "@material-ui/core/Grid";
import CryptocurrencyFeatured from "../../../components/Dashboard/Cryptocurrency/CryptocurrencyFeatured";
import CyptoTrading from "../../../components/Dashboard/Cryptocurrency/CyptoTrading";
import TradeHistory from "../../../components/Dashboard/Cryptocurrency/TradeHistory";
import CandleStick from "../../../components/Dashboard/Cryptocurrency/CandleStick";
import Transactions from "../../../components/Dashboard/Cryptocurrency/Transactions";
import Comparison from "../../../components/Dashboard/Cryptocurrency/Comparison";

export function Cryptocurrency() {
  useInjectReducer({ key: 'cryptocurrency', reducer });
  useInjectSaga({ key: 'cryptocurrency', saga });

  return (
    <Fragment>
      <h2 className="breadcumbTitle">Dashboard > Cryptocurrency</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CryptocurrencyFeatured />
        </Grid>
        <Grid item md={9} xs={12}>
          <CyptoTrading />
        </Grid>
        <Grid item md={3} xs={12}>
          <TradeHistory />
        </Grid>
        <Grid item xs={12}>
          <CandleStick />
        </Grid>
        <Grid item lg={4} xs={12}>
          <Transactions />
        </Grid>
        <Grid item lg={8} xs={12}>
          <Comparison />
        </Grid>
      </Grid>
    </Fragment>
  );
}

Cryptocurrency.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cryptocurrency: makeSelectCryptocurrency(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Cryptocurrency);
