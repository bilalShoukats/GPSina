/**
 *
 * AlertPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Grid, Typography } from '@material-ui/core';
import makeSelectAlertPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';

export function AlertPage(props) {
  useInjectReducer({ key: 'alertPage', reducer });
  useInjectSaga({ key: 'alertPage', saga });

  const classes = useStyles(props);

  return (
    <div>
      <Helmet>
        <title>Alert</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.alert} />} showClearBtn />
      <Grid className={classes.container}>
        <Typography variant="body1" align="center">
          <FormattedMessage {...messages.noAlertFound} />
        </Typography>
      </Grid>
    </div>
  );
}

AlertPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  alertPage: makeSelectAlertPage(),
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

export default compose(withConnect)(AlertPage);
