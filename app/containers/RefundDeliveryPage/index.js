/**
 *
 * RefundDeliveryPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import { useStyles } from './styles.js';

import messages from './messages';
import { Grid, Typography } from '@material-ui/core';

export function RefundDeliveryPage(props) {
  const classes = useStyles(props);
  
  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.refundDelivery})}</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.refundDelivery} />} />

      <div>
        <Grid
          container
          direction="column"
          className={classes.root}
        >
          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.refundPolicy} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <FormattedMessage {...messages.refundPolicyDescription} />
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.simRenewal} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <FormattedMessage {...messages.simRenewalDescription} />
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.deliveryMethod} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <FormattedMessage {...messages.deliveryMethodDescription} />
            </Typography>
            <Typography variant="body2" className={classes.bulletPoint}>
              <FormattedMessage {...messages.dealerOutletInstallation} />
            </Typography>
            <Typography variant="body2" className={classes.bulletPointDesc}>
              <FormattedMessage {...messages.dealerOutletInstallationDescription} />
            </Typography>
            <Typography variant="body2" className={classes.bulletPoint}>
              <FormattedMessage {...messages.homeInstallation} />
            </Typography>
            <Typography variant="body2" className={classes.bulletPointDesc}>
              <FormattedMessage {...messages.homeInstallationDescription} />
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.websiteLink} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <a className={classes.link} href="http://www.gpsina.com" target="_blank">www.gpsina.com</a>
            </Typography>
          </Grid>

        </Grid>
      </div>
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

export default compose(withConnect)(injectIntl(RefundDeliveryPage));
