/**
 *
 * ForgotPasswordPage
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
import makeSelectForgotPasswordPage from './selectors';
import reducer from './reducer';
import messages from './messages';
import Img from '../../components/Img';
import { useStyles } from './styles.js';

import SCREENS from '../../constants/screen';

import GPSinaLogoGrey from '../../../assets/images/logo/logo-small-gray.png';

export function ForgotPasswordPage(props) {
  useInjectReducer({ key: 'forgotPasswordPage', reducer });

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
              <FormattedMessage {...messages.email} />
            </Typography>
            <Input
              className={classes.textfield}
              // defaultValue={"email"}
              placeholder="Enter Email"
              disableUnderline
            />
          </div>

          <div className={classes.inlineContainer}>
            <Link to={SCREENS.LOGIN} className={classes.link}>
              <Button className={classes.btn} variant="contained">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  color="#FFFFFF"
                  style={{ marginRight: '5px' }}
                  size="md"
                />
                <FormattedMessage {...messages.back} />
              </Button>
            </Link>
            <Button className={classes.btn} variant="contained">
              <FormattedMessage {...messages.reset} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

ForgotPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  forgotPasswordPage: makeSelectForgotPasswordPage(),
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

export default compose(withConnect)(ForgotPasswordPage);
