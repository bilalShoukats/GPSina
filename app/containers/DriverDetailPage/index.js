/**
 *
 * DriverDetailPage
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
import makeSelectDriverDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { Button, Grid,Input, Radio, RadioGroup, Typography } from '@material-ui/core';
import UserAvatar from '../../components/UserAvatar';
import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export function DriverDetailPage(props) {
  useInjectReducer({ key: 'driverDetailPage', reducer });
  useInjectSaga({ key: 'driverDetailPage', saga });

  const classes = useStyles(props);
  const [isEditMode, setisEditmode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [idNum, setIdNum] = useState("");
  const [dob, setDob] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [licenseNum, setLicenseNum] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleEditMode = () => {
    if(isEditMode){
      console.log('save genset info');
    }
    setisEditmode(!isEditMode)
  }

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
        setLicenseType(value);
        break;

      case 'licenseNum':
        setLicenseNum(value);
        break;

      case 'expiryDate':
        setExpiryDate(value);
        break;
    }
  }

  useEffect(() => {
    console.log(props.location.state);
    if(props.location.state.driver){
      const driver = props.location.state.driver;
      setDob(driver.dob);
      setExpiryDate(driver.expiryDate);
      setIdNum(driver.idNum);
      setLicenseNum(driver.licenseNum);
      setLicenseType(driver.licenseType);
      setName(driver.name);
      setPassword(driver.password);
      setUsername(driver.username);
    } else {
      props.history.goBack()
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.driverInfo})}</title>
      </Helmet>
      <Header 
        title={<FormattedMessage {...messages.driverInfo} />} 
        showEditBtn
        onEdit={handleEditMode}
        isEditMode={isEditMode}
      />

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
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
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
                type="password"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
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
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
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
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
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
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
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
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
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
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
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
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
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
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterExpiryDate})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>
          </div>

        </Grid>
      </div>
    </div>
  );
}

DriverDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  driverDetailPage: makeSelectDriverDetailPage(),
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

export default compose(withConnect)(injectIntl(DriverDetailPage));
