/**
 *
 * ExpiredDevicePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import { useStyles } from './styles.js';

import messages from './messages';

export function ExpiredDevicePage(props) {
  return (
    <div>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.expiredDevices} />} />

      <div />
    </div>
  );
}

ExpiredDevicePage.propTypes = {
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

export default compose(withConnect)(ExpiredDevicePage);
