/**
 *
 * SettingsPage
 *
 */

import React, { useEffect, useState } from 'react';
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
import { Manager } from '../../StorageManager/Storage';
import { SuperHOC } from '../../HOC';
import APIURLS from '../../ApiManager/apiUrl';

export function SettingsPage(props) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });

  const classes = useStyles(props);
  const history = useHistory();

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case 'username':
        setUserName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'mobileNo':
        setMobileNo(value);
        break;
      
      case 'oldPassword':
        setOldPassword(value);
        break;

      case 'newPassword':
        setNewPassword(value);
        break;
    }
  }

  const goToContactUsScreen = () => {
    history.push(SCREENS.CONTACTUS);
  };

  const goToRefundDeliveryScreen = () => {
    history.push(SCREENS.REFUNDDELIVERY);
  };

  const goToExpiredDevicesScreen = () => {
    history.push(SCREENS.EXPIREDDEVICES);
  };

  const logOut = () => {
    // console.log('remove token and use from localStorage');
    Manager.removeItem('token');
    Manager.removeItem('user');
    window.location.reload();
  };

  useEffect(() => {
    console.log('useEffect Settings');
    Manager.getItemCallback('user', true, (res) => {
      console.log(res);
      setUserName(res.userName);
      setEmail(res.email);
      setMobileNo(res.phone);
    })
  }, []);

  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.settings} />} />

      <div>
        <Grid
          item
          sm={8}
          md={6}
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
                value={userName}
                name="username"
                placeholder="Enter User Name"
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body2" className={classes.label}>
                <FormattedMessage {...messages.email} />
              </Typography>
              <Input
                className={classes.textInput}
                value={email}
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body2" className={classes.label}>
                <FormattedMessage {...messages.mobile} />
              </Typography>
              <Input
                className={classes.textInput}
                value={mobileNo}
                name="mobileNo"
                placeholder="Enter mobile no"
                onChange={handleChange}
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
                name="oldPassword"
                value={oldPassword}
                placeholder="Enter old password"
                onChange={handleChange}
                disableUnderline
              />
            </Grid>
            <Grid item>
              <Typography variant="body2" className={classes.label}>
                <FormattedMessage {...messages.newPassword} />
              </Typography>
              <Input
                className={classes.textInput}
                name="newPassword"
                value={newPassword}
                placeholder="Enter new password"
                onChange={handleChange}
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
                onClick={goToRefundDeliveryScreen}
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

              <Button
                className={classes.btnRed}
                variant="contained"
                onClick={logOut}
              >
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

export default SuperHOC(compose(withConnect)(SettingsPage));
