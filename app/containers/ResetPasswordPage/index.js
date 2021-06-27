/**
 *
 * ResetPasswordPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Input, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectResetPasswordPage from './selectors';
import reducer from './reducer';
import messages from './messages';
import Img from '../../components/Img';
import { useStyles } from './styles.js';

import SCREENS from '../../constants/screen';

import GPSinaLogoGrey from '../../../assets/images/logo/logo-small-gray.png';

export function ResetPasswordPage(props) {
  useInjectReducer({ key: 'resetPasswordPage', reducer });

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Img
        src={GPSinaLogoGrey}
        alt="GPSina Grey Logo"
        className={classes.logo}
      />
      <div className={classes.container}>
        <form noValidate autoComplete="off">
          <div className={classes.content}>
            <Typography variant="body1" color="initial">
              <FormattedMessage {...messages.newPassword} />
            </Typography>
            <Input
              className={classes.textfield}
              // defaultValue={"email"}
              placeholder="Enter New Password"
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
            <FormattedMessage {...messages.submit} />
          </Button>
        </form>
      </div>
    </div>
  );
}

ResetPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resetPasswordPage: makeSelectResetPasswordPage(),
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

export default compose(withConnect)(ResetPasswordPage);
