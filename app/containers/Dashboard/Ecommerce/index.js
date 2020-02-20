/**
 *
 * Ecommerce
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
import makeSelectEcommerce from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Grid from "@material-ui/core/Grid";
import EcommerceFeatured from "../../../components/Dashboard/Ecommerce/EcommerceFeatured";
import EmailSent from "../../../components/Dashboard/Ecommerce/EmailSent";
import SalesStatistics from "../../../components/Dashboard/Ecommerce/SalesStatistics";
import Earning from "../../../components/Dashboard/Ecommerce/Earning";
import Orders from "../../../components/Dashboard/Ecommerce/Orders";
import OrderList from "../../../components/Dashboard/Ecommerce/OrderList";

export function Ecommerce() {
  useInjectReducer({key: 'ecommerce', reducer});
  useInjectSaga({key: 'ecommerce', saga});

  return (
    <Fragment>
      <h2 className="breadcumbTitle">Dashboard > Ecommerce</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EcommerceFeatured/>
        </Grid>
        <Grid item lg={5} xs={12}>
          <EmailSent/>
        </Grid>
        <Grid item lg={7} xs={12}>
          <SalesStatistics/>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Earning/>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Orders/>
        </Grid>
        <Grid item md={12} xs={12}>
          <OrderList/>
        </Grid>
      </Grid>
    </Fragment>
  );
}

// Ecommerce.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  ecommerce: makeSelectEcommerce(),
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

export default compose(withConnect)(Ecommerce);
