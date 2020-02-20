/**
 *
 * BankingSystem
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
import makeSelectBankingSystem from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Grid from "@material-ui/core/Grid";
import BankingSystemFeature from 'components/Dashboard/BankingSystem/BankingSystemFeature';
import BalanceStatistics from 'components/Dashboard/BankingSystem/BalanceStatistics';
import Transactions from 'components/Dashboard/BankingSystem/Transactions';
import CreditCard from 'components/Dashboard/BankingSystem/CreditCard';
import HistoryChart from 'components/Dashboard/BankingSystem/HistoryChart';
import Loans from 'components/Dashboard/BankingSystem/Loans';
import RecentVendors from 'components/Dashboard/BankingSystem/RecentVendors';

export function BankingSystem() {
  useInjectReducer({key: 'bankingSystem', reducer});
  useInjectSaga({key: 'bankingSystem', saga});

  return (
    <Fragment>
      <Helmet>
        <title>BankingSystem</title>
        <meta name="description" content="Description of BankingSystem"/>
      </Helmet>
      <h2 className="breadcumbTitle">Dashboard > Banking System</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BankingSystemFeature/>
        </Grid>
        <Grid item lg={8} xs={12}>
          <BalanceStatistics/>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Transactions/>
        </Grid>
        <Grid item lg={4} xs={12}>
          <CreditCard/>
        </Grid>
        <Grid item lg={8} xs={12}>
          <HistoryChart/>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Loans/>
        </Grid>
        <Grid item lg={6} xs={12}>
          <RecentVendors/>
        </Grid>
      </Grid>
    </Fragment>
  );
}

BankingSystem.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bankingSystem: makeSelectBankingSystem(),
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

export default compose(withConnect)(BankingSystem);
