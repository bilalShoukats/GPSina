/**
 *
 * Crm
 *
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import makeSelectCrm from './selectors';
import reducer from './reducer';
import saga from './saga';
import Grid from "@material-ui/core/Grid";
import CrmFeatured from "../../../components/Dashboard/Crm/CrmFeatured";
import Balance from "../../../components/Dashboard/Crm/Balance";
import Expense from "../../../components/Dashboard/Crm/Expense";
import InVestment from "../../../components/Dashboard/Crm/Invesment";
import Income from "../../../components/Dashboard/Crm/Income";
import ActiveDeals from "../../../components/Dashboard/Crm/ActiveDeals";

export function Crm() {
  useInjectReducer({key: 'crm', reducer});
  useInjectSaga({key: 'crm', saga});

  return (
    <Fragment>
      <h2 className="breadcumbTitle">Dashboard > CRM</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CrmFeatured/>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Balance/>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Expense/>
        </Grid>
        <Grid item lg={4} xs={12}>
          <InVestment/>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Income/>
        </Grid>
        <Grid item xs={12}>
          <ActiveDeals/>
        </Grid>
      </Grid>
    </Fragment>
  );
}

Crm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  crm: makeSelectCrm(),
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

export default compose(withConnect)(Crm);
