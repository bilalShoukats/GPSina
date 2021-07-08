/**
 *
 * RefundDeliveryPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { SuperHOC } from '../../HOC';
import Header from '../../components/Header';
import { useStyles } from './styles.js';

import messages from './messages';

export function RefundDeliveryPage(props) {
  return (
    <div>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.refundDelivery} />} />

      <div />
    </div>
  );
}

RefundDeliveryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default SuperHOC(compose(withConnect)(RefundDeliveryPage));