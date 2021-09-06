/**
 *
 * GensetDetailPage
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
import makeSelectGensetDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { gensetList } from '../../constants/dummy';
import { FormControl, FormControlLabel, Grid,Input, Radio, RadioGroup, Typography } from '@material-ui/core';
import UserAvatar from '../../components/UserAvatar';
import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export function GensetDetailPage(props) {
  useInjectReducer({ key: 'gensetDetailPage', reducer });
  useInjectSaga({ key: 'gensetDetailPage', saga });

  const classes = useStyles(props);
  const [regNo, setRegNo] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [fuelTankCapacity, setFuelTankCapacity] = useState("");
  const [fuelTankFullCapacity, setFuelTankFullCapacity] = useState("");
  const [customer, setCustomer] = useState("Select Customer");
  const [vehicleType, setVehicleType] = useState("");
  const [company, setCompany] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [reading, setReading] = useState("");
  const [interval, setInterval] = useState("");
  const [next, setNext] = useState("");
  const [isTypePrivate, setIsTypePrivate] = useState("private");
  const [isEditMode, setisEditmode] = useState(false);

  const handleTypeChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setIsTypePrivate(value)
  }

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
      case 'regNo':
        setRegNo(value);
        break;

      case 'make':
        setMake(value);
        break;

      case 'model':
        setModel(value);
        break;

      case 'year':
        setYear(value);
        break;

      case 'color':
        setColor(value);
        break;

      case 'fuelTankCapacity':
        setFuelTankCapacity(value);
        break;

      case 'fuelTankFullCapacity':
        setFuelTankFullCapacity(value);
        break;

      case 'customer':
        setCustomer(value);
        break;

      case 'vehicleType':
        setVehicleType(value);
        break;

      case 'company':
        setCompany(value);
        break;

      case 'number':
        setNumber(value);
        break;

      case 'type':
        setType(value);
        break;

      case 'expirydate':
        setExpiryDate(value);
        break;

      case 'reading':
        setReading(value);
        break;

      case 'interval':
        setInterval(value);
        break;

      case 'next':
        setNext(value);
        break;
    }
  }

  useEffect(() => {
    console.log(props.location.state);
    if(props.location.state.genset){
      const genset = props.location.state.genset;
      setRegNo(genset.regNo);
      setMake(genset.make);
      setModel(genset.model);
      setYear(genset.year);
      setColor(genset.color);
      setIsTypePrivate(genset.type);
      setFuelTankCapacity(genset.fuelTankCapacity);
    } else {
      props.history.goBack()
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.gensetInfo})}</title>
      </Helmet>
      <Header 
        title={<FormattedMessage {...messages.gensetInfo} />} 
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
            <RadioGroup className={classes.radioContainer} row aria-label="position" name="position" defaultValue="top">
              <FormControlLabel
                value="private"
                checked={isTypePrivate === "private" ? true : false}
                control={<Radio color="secondary" />}
                label="Private"
                onChange={handleTypeChange}
                className={classes.radioGroup}
              />
              <FormControlLabel
                value="commercial"
                checked={isTypePrivate === "commercial" ? true : false}
                control={<Radio color="secondary" />}
                label="Comercial"
                onChange={handleTypeChange}
                className={classes.radioGroup}
              />
            </RadioGroup>

            <Typography variant="h5" className={classes.title}>
              <FormattedMessage {...messages.generalInformation} />
            </Typography>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.regNo} />
              </Typography>
              <Input
                className={classes.textInput}
                value={regNo}
                name="regNo"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterRegNo})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.make} />
              </Typography>
              <Input
                className={classes.textInput}
                value={make}
                name="make"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterMake})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.model} />
              </Typography>
              <Input
                className={classes.textInput}
                value={model}
                name="model"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterModel})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.year} />
              </Typography>
              <Input
                className={classes.textInput}
                value={year}
                name="year"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterYear})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.color} />
              </Typography>
              <Input
                className={classes.textInput}
                value={color}
                name="color"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterColor})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.fuelTankCapacity} />
              </Typography>
              <Input
                className={classes.textInput}
                value={fuelTankCapacity}
                name="fuelTankCapacity"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterFuelTankCapacity})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.fuelTankFullCapacity} />
              </Typography>
              <Input
                className={classes.textInput}
                value={fuelTankFullCapacity}
                name="fuelTankFullCapacity"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterFuelTankFullCapacity})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.customer} />
              </Typography>
              <Input
                className={classes.textInput}
                value={customer}
                name="customer"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.selectCustomer})}
                // onClick={() => setCustomer('Azure Testing')}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.vehicleType} />
              </Typography>
              <Input
                className={classes.textInput}
                value={vehicleType}
                name="vehicleType"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterVehicleType})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Typography variant="h5" className={classes.title}>
              <FormattedMessage {...messages.insuranceInformation} />
            </Typography>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.company} />
              </Typography>
              <Input
                className={classes.textInput}
                value={company}
                name="company"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterCompany})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.number} />
              </Typography>
              <Input
                className={classes.textInput}
                value={number}
                name="number"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterNumber})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.type} />
              </Typography>
              <Input
                className={classes.textInput}
                value={type}
                name="type"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterType})}
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

            <Typography variant="h5" className={classes.title}>
              <FormattedMessage {...messages.maintenanceInformation} />
            </Typography>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.reading} />
              </Typography>
              <Input
                className={classes.textInput}
                value={reading}
                name="reading"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterReading})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.interval} />
              </Typography>
              <Input
                className={classes.textInput}
                value={interval}
                name="interval"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterInterval})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.next} />
              </Typography>
              <Input
                className={classes.textInput}
                value={next}
                name="next"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterNext})}
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

GensetDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gensetDetailPage: makeSelectGensetDetailPage(),
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

export default compose(withConnect)(injectIntl(GensetDetailPage));
