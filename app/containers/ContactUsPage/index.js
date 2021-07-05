/**
 *
 * ContactUsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { SuperHOC } from '../../HOC';
import Header from '../../components/Header';
import { useStyles } from './styles.js';

import messages from './messages';
import { Grid, Typography } from '@material-ui/core';

export function ContactUsPage(props) {
  const classes = useStyles(props);

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.contactUs})}</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.contactUs} />} />

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
              <FormattedMessage {...messages.companyName} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <FormattedMessage {...messages.gpSinaAsiaSdnBhd} />
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.registrationNumber} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <FormattedMessage {...messages.registrationNum} />
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.emailAddress} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <a className={classes.link} href="mailto:acc.gpsina@pettorway.com.my">acc.gpsina@pettorway.com.my</a>
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.call} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              +603-2715 1557
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.smsWhatsapp} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              +6012-3288 960
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.wechat} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <FormattedMessage {...messages.wechatId} />
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.companyAddress} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              A-20-36, Kompleks Rimbun Scott Garden, No. 289, Jalan Klang Lama, 58100 Kuala Lumpur, Malaysia
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.activationService} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <FormattedMessage {...messages.workingHour} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <FormattedMessage {...messages.lunchHour} />
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

ContactUsPage.propTypes = {
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

export default SuperHOC(compose(withConnect)(injectIntl(ContactUsPage)));
