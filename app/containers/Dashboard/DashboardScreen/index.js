/**
 *
 * DashboardScreen
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboardScreen from './selectors';
import reducer from './reducer';
import saga from './saga';
import Grid from "@material-ui/core/Grid";
import DashboardFeature from "../../../components/Dashboard/DashboardScreen/DashboardFeature";
import CryptocurrencyFeatured from "../../../components/Dashboard/Cryptocurrency/CryptocurrencyFeatured";

export function DashboardScreen() {
  useInjectReducer({ key: 'dashboardScreen', reducer });
  useInjectSaga({ key: 'dashboardScreen', saga });

  return (
    <Fragment>
      <h2 className="breadcumbTitle">Dashboard</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardFeature />
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <CryptocurrencyFeatured />
        </Grid>
      </Grid>
    </Fragment>
  );
}

DashboardScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardScreen: makeSelectDashboardScreen(),
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

export default compose(withConnect)(DashboardScreen);
