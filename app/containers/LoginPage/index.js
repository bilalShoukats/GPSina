/**
 *
 * LoginPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Input, Typography, Grid } from '@material-ui/core';

import { useInjectReducer } from 'utils/injectReducer';
import { Link, useHistory } from 'react-router-dom';
import reducer from './reducer';
import messages from './messages';
import { useStyles } from './styles.js';
import Img from '../../components/Img';
import SCREENS from '../../constants/screen';
import CheckBox from '../../components/CheckBox';

import GPSinaLogoGrey from '../../../assets/images/logo/logo-small-gray.png';
import UKFlag from '../../../assets/images/flags/uk.png';
import { SuperHOC } from '../../HOC';
import CustomModal from '../../components/CustomModal';
import APIURLS from '../../ApiManager/apiUrl';

export function LoginPage(props) {
  useInjectReducer({ key: 'login', reducer });

  const [loading, setLoading] = useState('');
  const [errors, setErrors] = useState({
    newEmail: '',
    newPassword: '',
    newConfirmPassword: '',
    newUsername: '',
    newFirstname: '',
    newLastname: '',
    newMobileNo: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [newFirstname, setNewFirstname] = useState('');
  const [newLastname, setNewLastname] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newMobileNo, setNewMobileNo] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  const classes = useStyles(props);
  const history = useHistory();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let error = errors;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      case 'newEmail':
        error.newEmail = 
          validEmailRegex.test(value)
            ? ''
            : props.intl.formatMessage({ ...messages.notValidEmail })
        
        setNewEmail(value);
        break;

      case 'newPassword':
        error.newPassword = 
          value.length < 8
            ? props.intl.formatMessage({ ...messages.atLeast8Character })
            : ''
        error.newConfirmPassword = ''
        
        setNewPassword(value);
        break;

      case 'newConfirmPassword':
        error.newConfirmPassword = 
          value != newPassword && value.length > 0
            ? props.intl.formatMessage({ ...messages.mismatchPassword })
            : ''
        
        setNewConfirmPassword(value);
        break;

      case 'newFirstname':
        error.newFirstname = 
          value.length < 5
            ? props.intl.formatMessage({ ...messages.atLeast5Character })
            : ''
        
        setNewFirstname(value);
        break;

      case 'newLastname':
        error.newLastname = 
          value.length < 5
            ? props.intl.formatMessage({ ...messages.atLeast5Character })
            : ''
        
        setNewLastname(value);
        break;

      case 'newUsername':
        error.newUsername = 
          value.length < 5
            ? props.intl.formatMessage({ ...messages.atLeast5Character })
            : ''

        setNewUsername(value);
        break;

      case 'newMobileNo':
        error.newMobileNo = 
          value.length < 9
            ? props.intl.formatMessage({ ...messages.invalidMobileNo })
            : ''
        
        setNewMobileNo(value);
        break;
    }

    setErrors(error);
  }

  const handleRemeberMe = event => {
    setRememberMe(event.target.checked);
  };

  const handleAutoLogin = event => {
    setAutoLogin(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { id } = event.target;

    switch (id) {
      case 'login':
        if(email == '' || password == ''){
          setModalTitle(props.intl.formatMessage({ ...messages.validationError }));
          setModalDescription(props.intl.formatMessage({ ...messages.pleaseCheckEmailAndPassword }))
          handleOpenModal();
        } else {
          let body = {
            email: email,
            password: password,
            appVersion: props.apiManager.appVersion
          };
          props.apiManager.callApi(APIURLS.login, 'POST', body, (res) => {
            console.log(res);
            if(res.code === 2003){
              props.apiManager.saveToken(res.response.email, res.response.hash);
              history.push(SCREENS.HOME);
            }
          })
        }
        
        break;

      case 'signUp':
        if(validateForm(errors)) {
          if(newEmail == '' || newPassword == '' || newConfirmPassword == ''){
            setModalTitle(props.intl.formatMessage({ ...messages.validationError }));
            setModalDescription(props.intl.formatMessage({ ...messages.pleaseCheckEmailAndPassword }))
            handleOpenModal();
          }

          // setModalTitle(props.intl.formatMessage({ ...messages.loginFailed }));
          // setModalDescription(props.intl.formatMessage({ ...messages.invalidEmailPassword }))
          // handleOpenModal();
          let body = {
            firstName: newFirstname,
            lastName: newLastname,
            userName: newUsername,
            password: newPassword,
            email: newEmail,
            phone: newMobileNo,
            role: 0
          };
          props.apiManager.callApi(APIURLS.register, 'POST', body, (res) => {
            console.log(res);
            if(res.code === 1006){
              setModalTitle(props.intl.formatMessage({ ...messages.registerSuccessful }));
              setModalDescription(props.intl.formatMessage({ ...messages.pleaseLoginUsingThisCredential }))
              handleOpenModal();
            }
          })
        } else {
          console.log(errors);
          setModalTitle(props.intl.formatMessage({ ...messages.validationError }));
          setModalDescription(props.intl.formatMessage({ ...messages.pleaseCheckEmailAndPassword }))
          handleOpenModal();
        }
        break;
    }
  }

  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };

  const handleOpenModal = () => {
    setIsModalShown(true);
  };

  const handleCloseModal = () => {
    setIsModalShown(false);
    if(props.intl.formatMessage({ ...messages.registerSuccessful })){
      window.location.reload();
    }
  };

  const goToForgotPasswordScreen = () => {
    history.push(SCREENS.FORGOTPASSWORD);
  }

  useEffect(() => {
    
  }, []);

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
        <CustomModal
          open={isModalShown}
          handleClose={handleCloseModal}
          type="simple"
          title={modalTitle}
          description={modalDescription}
        />
        <div className={classes.rightContainer}>
          <FormattedMessage {...messages.language} />
          <Button className={classes.btnLang} variant="contained">
            <FormattedMessage {...messages.languageName} />
            <Img src={UKFlag} alt="UK Flag" className={classes.flagStyles} />
          </Button>
        </div>

        <form id="login" onSubmit={handleSubmit} noValidate autoComplete="off">
          <div className={classes.content}>
            <Typography variant="body1" color="initial" className={classes.textStyle}>
              <FormattedMessage {...messages.email} />
            </Typography>
            <Input
              id="email"
              type="text"
              name="email"
              className={classes.textfield}
              value={email}
              onChange={handleChange}
              placeholder="Enter Email"
              disableUnderline
            />
            
            <Typography variant="body1" color="initial" className={classes.textStyle}>
              <FormattedMessage {...messages.password} />
            </Typography>
            <Input
              id="password"
              name="password"
              type="password"
              className={classes.textfield}
              value={password}
              onChange={handleChange}
              placeholder="Enter Password"
              disableUnderline
            />
            
            <Grid
              container
              justify="space-between"
              alignItems="center"
              direction="row"         
            >
              <Grid
                container
                direction="row"
                alignItems="center"
                xs
              >
                <CheckBox checked={rememberMe} name="rememberMe" onChange={handleRemeberMe} />
                <Typography variant="body1" color="initial">
                  <FormattedMessage {...messages.rememberMe} />
                </Typography>
              </Grid>
              <Grid
                item
                className={classes.link}
                onClick={goToForgotPasswordScreen}
              >
                <FormattedMessage {...messages.forgotPassword} />
              </Grid>
            </Grid>

            <Grid
                container
                direction="row"
                alignItems="center"
                xs
              >
              <CheckBox checked={autoLogin} name="autoLogin" onChange={handleAutoLogin} />
              <Typography variant="body1" color="initial" className={classes.textStyle}>
                <FormattedMessage {...messages.autoLogin} />
              </Typography>
            </Grid>
          </div>

          <Button type="submit" className={classes.btn} variant="contained">
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

        <form id="signUp" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.content}>
          <Typography variant="body1" color="initial" className={classes.textStyle}>
              <FormattedMessage {...messages.firstname} />
            </Typography>
            <Input
              id="newFirstname"
              type="text"
              name="newFirstname"
              className={classes.textfieldSignUp}
              value={newFirstname}
              onChange={handleChange}
              type="email"
              placeholder="Enter firstname"
              disableUnderline
            />
            {errors.newFirstname.length > 0 && 
                <span className={classes.error}>{errors.newFirstname}</span>}

            <Typography variant="body1" color="initial" className={classes.textStyle}>
              <FormattedMessage {...messages.lastname} />
            </Typography>
            <Input
              id="newLastname"
              type="text"
              name="newLastname"
              className={classes.textfieldSignUp}
              value={newLastname}
              onChange={handleChange}
              type="email"
              placeholder="Enter lastname"
              disableUnderline
            />
            {errors.newLastname.length > 0 && 
                <span className={classes.error}>{errors.newLastname}</span>}

            <Typography variant="body1" color="initial" className={classes.textStyle}>
              <FormattedMessage {...messages.username} />
            </Typography>
            <Input
              id="newUsername"
              type="text"
              name="newUsername"
              className={classes.textfieldSignUp}
              value={newUsername}
              onChange={handleChange}
              type="text"
              placeholder="Enter username"
              disableUnderline
            />
            {errors.newUsername.length > 0 && 
                <span className={classes.error}>{errors.newUsername}</span>}

            <Typography variant="body1" color="initial" className={classes.textStyle}>
              <FormattedMessage {...messages.email} />
            </Typography>
            <Input
              id="newEmail"
              name="newEmail"
              className={classes.textfieldSignUp}
              value={newEmail}
              onChange={handleChange}
              type="email"
              placeholder="Enter Email"
              disableUnderline
            />
            {errors.newEmail.length > 0 && 
                <span className={classes.error}>{errors.newEmail}</span>}

            <Typography variant="body1" color="initial" className={classes.textStyle}>
              <FormattedMessage {...messages.mobileNo} />
            </Typography>
            <Input
              id="newMobileNo"
              type="number"
              name="newMobileNo"
              className={classes.textfieldSignUp}
              value={newMobileNo}
              onChange={handleChange}
              placeholder="Enter Mobile No"
              disableUnderline
            />
            {errors.newMobileNo.length > 0 && 
                <span className={classes.error}>{errors.newMobileNo}</span>}

            <Typography variant="body1" color="initial" className={classes.textStyle}>
              <FormattedMessage {...messages.password} />
            </Typography>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              className={classes.textfieldSignUp}
              value={newPassword}
              onChange={handleChange}
              placeholder="Enter Password"
              disableUnderline
            />
            {errors.newPassword.length > 0 && 
                <span className={classes.error}>{errors.newPassword}</span>}

            <Typography variant="body1" color="initial" className={classes.textStyle}>
              <FormattedMessage {...messages.confirmPassword} />
            </Typography>
            <Input
              id="newConfirmPassword"
              name="newConfirmPassword"
              type="password"
              className={classes.textfieldSignUp}
              value={newConfirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              disableUnderline
            />
            {errors.newConfirmPassword.length > 0 && 
                <span className={classes.error}>{errors.newConfirmPassword}</span>}

          </div>

          <Button type="submit" className={classes.btn} variant="contained">
            <FormattedMessage {...messages.signUp} />
          </Button>
        </form>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({

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

export default SuperHOC(compose(withConnect)(injectIntl(LoginPage)));
