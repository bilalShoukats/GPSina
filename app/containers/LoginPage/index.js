/**
 *
 * LoginPage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Input, Typography, Grid } from '@material-ui/core';

import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import messages from './messages';
import { useStyles } from './styles.js';
import Img from '../../components/Img';
import SCREENS from '../../constants/screen';
import CheckBox from '../../components/CheckBox';

import GPSinaLogoGrey from '../../../assets/images/logo/logo-small-gray.png';
import UKFlag from '../../../assets/images/flags/uk.png';

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });

  const classes = useStyles(props);

  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckBox = event => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Img
        src={GPSinaLogoGrey}
        alt="GPSina Grey Logo"
        className={classes.logo}
      />
      <div className={classes.container}>
        <div className={classes.rightContainer}>
          <FormattedMessage {...messages.language} />
          <Button className={classes.btnLang} variant="contained">
            <FormattedMessage {...messages.languageName} />
            <Img src={UKFlag} alt="UK Flag" className={classes.flagStyles} />
          </Button>
        </div>

        <form noValidate autoComplete="off">
          <div className={classes.content}>
            <Typography variant="body1" color="initial">
              <FormattedMessage {...messages.email} />
            </Typography>
            <Input
              className={classes.textfield}
              // defaultValue={"email"}
              placeholder="Enter Email"
              disableUnderline
            />

            <Typography variant="body1" color="initial">
              <FormattedMessage {...messages.password} />
            </Typography>
            <Input
              className={classes.textfield}
              // defaultValue={"email"}
              placeholder="Enter Password"
              disableUnderline
            />

            <Grid container>
              <Grid item xs>
                <CheckBox checked={rememberMe} onChange={handleCheckBox} />
                <Typography variant="body1" color="initial">
                  <FormattedMessage {...messages.rememberMe} />
                </Typography>
              </Grid>
              <Grid item>
                <Link className={classes.link} to={SCREENS.FORGOTPASSWORD}>
                  <FormattedMessage {...messages.forgotPassword} />
                </Link>
              </Grid>
            </Grid>
          </div>

          <Button className={classes.btn} variant="contained">
            <FormattedMessage {...messages.login} />
          </Button>
        </form>

        <Typography
          variant="body1"
          color="initial"
          className={classes.orStyles}
        >
          <FormattedMessage {...messages.or} />
        </Typography>

        <form noValidate autoComplete="off">
          <div className={classes.content}>
            <Typography variant="body1" color="initial">
              <FormattedMessage {...messages.email} />
            </Typography>
            <Input
              className={classes.textfield}
              // defaultValue={"email"}
              placeholder="Enter Email"
              disableUnderline
            />

            <Typography variant="body1" color="initial">
              <FormattedMessage {...messages.password} />
            </Typography>
            <Input
              className={classes.textfield}
              // defaultValue={"email"}
              placeholder="Enter Password"
              disableUnderline
            />

            <Typography variant="body1" color="initial">
              <FormattedMessage {...messages.confirmPassword} />
            </Typography>
            <Input
              className={classes.textfield}
              // defaultValue={"email"}
              placeholder="Confirm Password"
              disableUnderline
            />
          </div>

          <Button className={classes.btn} variant="contained">
            <FormattedMessage {...messages.signUp} />
          </Button>
        </form>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
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

export default compose(withConnect)(LoginPage);
