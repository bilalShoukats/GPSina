/**
 *
 * SettingsPage
 *
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Button, Grid, Input, Typography } from '@material-ui/core';
import makeSelectSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';

import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';
import UserAvatar from '../../components/UserAvatar';
import SCREENS from '../../constants/screen';

export function SettingsPage(props) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });

  const classes = useStyles(props);
  const history = useHistory();

  const goToContactUsScreen = () => {
    history.push(SCREENS.CONTACTUS);
  };

  const goToRefundDeliveryScreen = () => {
    history.push(SCREENS.REFUNDDELIVERY);
  };

  const goToExpiredDevicesScreen = () => {
    history.push(SCREENS.EXPIREDDEVICES);
  };

  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.settings} />} />

      <div>
        <Grid
          container
          sm={8}
          md={6}
          direction="column"
          className={classes.root}
        >
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.avatar}
          >
            <UserAvatar alt="Profile Avatar" src={defaultProfileImage} />
          </Grid>

          <div className={classes.container}>
            <Grid item>
              <Typography variant="body2" className={classes.label}>
                <FormattedMessage {...messages.username} />
              </Typography>
              <Input
                className={classes.textInput}
                // defaultValue={"email"}
                // placeholder="Enter User Name"
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body2" className={classes.label}>
                <FormattedMessage {...messages.email} />
              </Typography>
              <Input
                className={classes.textInput}
                // defaultValue={"email"}
                // placeholder="Enter User Name"
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body2" className={classes.label}>
                <FormattedMessage {...messages.mobile} />
              </Typography>
              <Input
                className={classes.textInput}
                // defaultValue={"email"}
                // placeholder="Enter User Name"
                disableUnderline
              />
            </Grid>
          </div>

          <div className={classes.container}>
            <Typography variant="h6" className={classes.title} align="center">
              <FormattedMessage {...messages.changePassword} />
            </Typography>
            <Grid item>
              <Typography variant="body2" className={classes.label}>
                <FormattedMessage {...messages.oldPassword} />
              </Typography>
              <Input
                className={classes.textInput}
                // defaultValue={"email"}
                // placeholder="Enter User Name"
                disableUnderline
              />
            </Grid>
            <Grid item>
              <Typography variant="body2" className={classes.label}>
                <FormattedMessage {...messages.newPassword} />
              </Typography>
              <Input
                className={classes.textInput}
                // defaultValue={"email"}
                // placeholder="Enter User Name"
                disableUnderline
              />
            </Grid>
          </div>

          <div className={classes.bottomContainer}>
            <Grid container alignItems="center" justify="center">
              <Button className={classes.btnBlue} variant="contained">
                <Typography variant="body1">
                  <FormattedMessage {...messages.save} />
                </Typography>
              </Button>

              <Button
                className={classes.btnBlue}
                variant="contained"
                onClick={goToContactUsScreen}
              >
                <Typography variant="body1">
                  <FormattedMessage {...messages.contactUs} />
                </Typography>
              </Button>

              <Button
                className={classes.btnYellow}
                variant="contained"
                onClick={goToExpiredDevicesScreen}
              >
                <Typography variant="body1">
                  <FormattedMessage {...messages.refundDeliveryMethod} />
                </Typography>
              </Button>

              <Button
                className={classes.btnYellow}
                variant="contained"
                onClick={goToExpiredDevicesScreen}
              >
                <Typography variant="body1">
                  <FormattedMessage {...messages.expiredDevices} />
                </Typography>
              </Button>

              <Button className={classes.btnRed} variant="contained">
                <Typography variant="body1">
                  <FormattedMessage {...messages.logOut} />
                </Typography>
              </Button>
            </Grid>
          </div>

          <Typography
            align="right"
            variant="body2"
            className={classes.versionStyle}
          >
            v: 0.7.8
          </Typography>
        </Grid>
      </div>
    </div>
  );
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingsPage: makeSelectSettingsPage(),
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

export default compose(withConnect)(SettingsPage);
