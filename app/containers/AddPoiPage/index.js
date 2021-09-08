/**
 *
 * AddPoiPage
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
import makeSelectAddPoiPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { Button, RadioGroup, FormControlLabel, Grid, Input, Radio, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faFlag, faHome, faIndustry, faMapMarkedAlt, faStreetView } from '@fortawesome/free-solid-svg-icons';

export function AddPoiPage(props) {
  useInjectReducer({ key: 'addPoiPage', reducer });
  useInjectSaga({ key: 'addPoiPage', saga });

  const classes = useStyles(props);
  const [poiName, setPoiName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [zone, setZone] = useState("");
  const [color, setColor] = useState("#0F0F0F");
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [email, setEmail] = useState("");
  const [markerShop, setMarkerShop] = useState("1");
  const [type, setType] = useState("private");

  const handleTypeChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setType(value)
  }

  const handleColorChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setColor(value);
  }

  const handleMarkerChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setMarkerShop(value);
  }

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    switch(name){
      case 'poiName':
        setPoiName(value);
        break;

      case 'latitude':
        setLatitude(value);
        break;

      case 'longitude':
        setLongitude(value);
        break;

      case 'address':
        setAddress(value);
        break;

      case 'zone':
        setZone(value);
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmitAddPoi');
    props.history.goBack();
  }

  useEffect(() => {

  }, []);

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.newPoi})}</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.newPoi} />} />

      <div>
        <Grid
          item
          sm={12}
          md={8}
          className={classes.root}
        >
          <div className={classes.container}>
            <RadioGroup className={classes.radioContainer} row aria-label="position" name="position" defaultValue="top">
              <FormControlLabel
                value="private"
                checked={type === "private" ? true : false}
                control={<Radio color="secondary" />}
                label="Private"
                onChange={handleTypeChange}
                className={classes.radioGroup}
              />
              <FormControlLabel
                value="business"
                checked={type === "business" ? true : false}
                control={<Radio color="secondary" />}
                label="Business"
                onChange={handleTypeChange}
                className={classes.radioGroup}
              />
            </RadioGroup>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.poiName} />
              </Typography>
              <Input
                className={classes.textInput}
                value={poiName}
                name="poiName"
                placeholder={props.intl.formatMessage({...messages.enterPoiName})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            { type === "business" &&
              <>
                <Grid item>
                  <Typography variant="body1" className={classes.label}>
                    <FormattedMessage {...messages.companyName} />
                  </Typography>
                  <Input
                    className={classes.textInput}
                    value={companyName}
                    name="companyName"
                    placeholder={props.intl.formatMessage({...messages.enterCompanyName})}
                    onChange={handleChange}
                    disableUnderline
                  />
                </Grid>

                <Grid item>
                  <Typography variant="body1" className={classes.label}>
                    <FormattedMessage {...messages.companyId} />
                  </Typography>
                  <Input
                    className={classes.textInput}
                    value={companyId}
                    name="companyId"
                    placeholder={props.intl.formatMessage({...messages.enterCompanyId})}
                    onChange={handleChange}
                    disableUnderline
                  />
                </Grid>

                <Grid item>
                  <Typography variant="body1" className={classes.label}>
                    <FormattedMessage {...messages.contactPerson} />
                  </Typography>
                  <Input
                    className={classes.textInput}
                    value={contactPerson}
                    name="contactPerson"
                    placeholder={props.intl.formatMessage({...messages.enterContactPerson})}
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
                    <FormattedMessage {...messages.mobileNum} />
                  </Typography>
                  <Input
                    className={classes.textInput}
                    value={mobileNum}
                    name="mobileNum"
                    placeholder={props.intl.formatMessage({...messages.enterMobileNum})}
                    onChange={handleChange}
                    disableUnderline
                  />
                </Grid>

                <Grid item>
                  <Typography variant="body1" className={classes.label}>
                    <FormattedMessage {...messages.email} />
                  </Typography>
                  <Input
                    className={classes.textInput}
                    value={email}
                    name="email"
                    placeholder={props.intl.formatMessage({...messages.enterEmail})}
                    onChange={handleChange}
                    disableUnderline
                  />
                </Grid>
              </>
            }

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.latitude} />
              </Typography>
              <Input
                className={classes.textInput}
                value={latitude}
                name="latitude"
                placeholder={props.intl.formatMessage({...messages.enterLatitude})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.longitude} />
              </Typography>
              <Input
                className={classes.textInput}
                value={longitude}
                name="longitude"
                placeholder={props.intl.formatMessage({...messages.enterLongitude})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.address} />
              </Typography>
              <Input
                className={classes.textInput}
                value={address}
                name="address"
                placeholder={props.intl.formatMessage({...messages.enterAddress})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.zone} />
              </Typography>
              <Input
                className={classes.textInput}
                value={zone}
                name="zone"
                placeholder={props.intl.formatMessage({...messages.enterZone})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item className={classes.radioSelection}>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.color} />
              </Typography>

              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={color === "#0F0F0F"}
                      onChange={handleColorChange}
                      value="#0F0F0F"
                    />
                    <div style={{ display: 'inline', width: '50px', height: '20px', backgroundColor: '#0F0F0F' }} />
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={color === "'#0000FF"}
                      onChange={handleColorChange}
                      value="'#0000FF"
                    />
                    <div style={{ display: 'inline', width: '50px', height: '20px', backgroundColor: '#0000FF' }} />
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={color === "#00FF00"}
                      onChange={handleColorChange}
                      value="#00FF00"
                    />
                    <div style={{ display: 'inline', width: '50px', height: '20px', backgroundColor: '#00FF00' }} />
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={color === "#FF0000"}
                      onChange={handleColorChange}
                      value="#FF0000"
                    />
                    <div style={{ display: 'inline', width: '50px', height: '20px', backgroundColor: '#FF0000' }} />
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={color === "#FFFF00"}
                      onChange={handleColorChange}
                      value="#FFFF00"
                    />
                    <div style={{ display: 'inline', width: '50px', height: '20px', backgroundColor: '#FFFF00' }} />
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={color === "#FFC0CB"}
                      onChange={handleColorChange}
                      value="#FFC0CB"
                    />
                    <div style={{ display: 'inline', width: '50px', height: '20px', backgroundColor: '#FFC0CB' }} />
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={color === "#800080"}
                      onChange={handleColorChange}
                      value="#800080"
                    />
                    <div style={{ display: 'inline', width: '50px', height: '20px', backgroundColor: '#800080' }} />
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={color === "#FFA500"}
                      onChange={handleColorChange}
                      value="#FFA500"
                    />
                    <div style={{ display: 'inline', width: '50px', height: '20px', backgroundColor: '#FFA500' }} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={classes.radioSelection}>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.markerShop} />
              </Typography>
              
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={markerShop === "1"}
                      onChange={handleMarkerChange}
                      value="1"
                    />
                    <FontAwesomeIcon
                      icon={faBuilding}
                      color="#FFFFFF"
                      size="lg"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={markerShop === "2"}
                      onChange={handleMarkerChange}
                      value="2"
                    />
                    <FontAwesomeIcon
                      icon={faIndustry}
                      color="#FFFFFF"
                      size="lg"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={markerShop === "3"}
                      onChange={handleMarkerChange}
                      value="3"
                    />
                    <FontAwesomeIcon
                      icon={faFlag}
                      color="#FFFFFF"
                      size="lg"
                    />
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={markerShop === "4"}
                      onChange={handleMarkerChange}
                      value="4"
                    />
                    <FontAwesomeIcon
                      icon={faHome}
                      color="#FFFFFF"
                      size="lg"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={markerShop === "5"}
                      onChange={handleMarkerChange}
                      value="5"
                    />
                    <FontAwesomeIcon
                      icon={faMapMarkedAlt}
                      color="#FFFFFF"
                      size="lg"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Grid
                    container
                    alignItems="center"
                  >
                    <Radio
                      checked={markerShop === "6"}
                      onChange={handleMarkerChange}
                      value="6"
                    />
                    <FontAwesomeIcon
                      icon={faStreetView}
                      color="#FFFFFF"
                      size="lg"
                    />
                  </Grid>
                </Grid>
                  
              </Grid>
            </Grid>
          </div>

          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.btnContainer}
          >
            <Button size="medium" className={classes.btnBlue} onClick={handleSubmit}>
              <Typography variant="body1">
                <FormattedMessage {...messages.save} />
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

AddPoiPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addPoiPage: makeSelectAddPoiPage(),
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

export default compose(withConnect)(injectIntl(AddPoiPage));
