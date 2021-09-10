/**
 *
 * AddDriverPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddDriverPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { Button, Grid, Input, Typography } from '@material-ui/core';
import UserAvatar from '../../components/UserAvatar';
import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';

export function AddDriverPage(props) {
  useInjectReducer({ key: 'addDriverPage', reducer });
  useInjectSaga({ key: 'addDriverPage', saga });

  const classes = useStyles(props);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [idNum, setIdNum] = useState("");
  const [dob, setDob] = useState("");
  const [licenseType, setLicensetype] = useState("");
  const [licenseNum, setLicenseNum] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    switch(name){
      case 'username':
        setUsername(value);
        break;

      case 'password':
        setPassword(value);
        break;

      case 'name':
        setName(value);
        break;

      case 'phoneNum':
        setPhoneNum(value);
        break;

      case 'idNum':
        setIdNum(value);
        break;

      case 'dob':
        setDob(value);
        break;

      case 'licenseType':
        setLicensetype(value);
        break;

      case 'licenseNum':
        setLicenseNum(value);
        break;

      case 'expiryDate':
        setExpiryDate(value);
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmitAddGenset');
    props.history.goBack();
  }

  useEffect(() => {

  }, []);

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.addDriver})}</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.addDriver} />} />

      <div>
        <Grid
          item
          sm={12}
          md={8}
          className={classes.root}
        >
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.avatar}
          >
            <UserAvatar alt="Profile Avatar" src={defaultProfileImage} style={{ width: '100px', height: '100px' }}/>
          </Grid>

          <div className={classes.container}>
            <Typography variant="h5" className={classes.title}>
              <FormattedMessage {...messages.driverInformation} />
            </Typography>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.username} />
              </Typography>
              <Input
                className={classes.textInput}
                value={username}
                name="username"
                placeholder={props.intl.formatMessage({...messages.enterUsername})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.password} />
              </Typography>
              <Input
                className={classes.textInput}
                value={password}
                name="password"
                placeholder={props.intl.formatMessage({...messages.enterPassword})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.name} />
              </Typography>
              <Input
                className={classes.textInput}
                value={name}
                name="name"
                placeholder={props.intl.formatMessage({...messages.enterName})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.idNum} />
              </Typography>
              <Input
                className={classes.textInput}
                value={idNum}
                name="idNum"
                placeholder={props.intl.formatMessage({...messages.enterIdNum})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.phoneNum} />
              </Typography>
              <Input
                className={classes.textInput}
                value={phoneNum}
                name="phoneNum"
                placeholder={props.intl.formatMessage({...messages.enterPhoneNum})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.dob} />
              </Typography>
              <Input
                className={classes.textInput}
                value={dob}
                name="dob"
                placeholder={props.intl.formatMessage({...messages.enterDob})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Typography variant="h5" className={classes.title}>
              <FormattedMessage {...messages.licenseInformation} />
            </Typography>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.licenseType} />
              </Typography>
              <Input
                className={classes.textInput}
                value={licenseType}
                name="licenseType"
                placeholder={props.intl.formatMessage({...messages.enterLicenseType})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.licenseNum} />
              </Typography>
              <Input
                className={classes.textInput}
                value={licenseNum}
                name="licenseNum"
                placeholder={props.intl.formatMessage({...messages.enterLicenseNum})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.expiryDate} />
              </Typography>
              <Input
                className={classes.textInput}
                value={expiryDate}
                name="expiryDate"
                placeholder={props.intl.formatMessage({...messages.enterExpiryDate})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>
          </div>

          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.btnContainer}
          >
            <Button color="primary" variant="contained" size="medium" className={classes.btnBlue} onClick={handleSubmit}>
              <Typography variant="body1">
                <FormattedMessage {...messages.submit} />
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

AddDriverPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addDriverPage: makeSelectAddDriverPage(),
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

export default compose(withConnect)(injectIntl(AddDriverPage));
