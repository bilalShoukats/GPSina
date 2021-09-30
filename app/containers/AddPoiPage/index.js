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
import POICOLORS from '../PoiDetailPage/poiColors';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddPoiPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import {
    Button,
    RadioGroup,
    FormControlLabel,
    Grid,
    Input,
    Radio,
    Typography,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faFlag,
    faHome,
    faIndustry,
    faMapMarkedAlt,
    faMapMarkerAlt,
    faStreetView,
} from '@fortawesome/free-solid-svg-icons';

export function AddPoiPage(props) {
    useInjectReducer({ key: 'addPoiPage', reducer });
    useInjectSaga({ key: 'addPoiPage', saga });

    const classes = useStyles(props);
    const [poiName, setPoiName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [address, setAddress] = useState('');
    const [zone, setZone] = useState('');
    const [color, setColor] = useState(POICOLORS['1']);
    const [companyName, setCompanyName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [mobileNum, setMobileNum] = useState('');
    const [email, setEmail] = useState('');
    const [markerShop, setMarkerShop] = useState('1');
    const [type, setType] = useState('private');
    const [errors, setErrors] = useState({
        poiName: '',
        latitude: '',
        longitude: '',
        address: '',
        zone: '',
        companyName: '',
        companyId: '',
        contactPerson: '',
        phoneNum: '',
        mobileNum: '',
        email: '',
    });

    const handleTypeChange = e => {
        e.preventDefault();
        const { value } = e.target;
        setType(value);
    };

    const handleColorChange = e => {
        e.preventDefault();
        const { value } = e.target;
        setColor(value);
    };

    const handleMarkerChange = e => {
        e.preventDefault();
        const { value } = e.target;
        setMarkerShop(value);
    };

    const handleChange = e => {
        e.preventDefault();
        let error = errors;
        const validEmailRegex = RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        );

        const { name, value } = e.target;

        switch (name) {
            case 'poiName':
                error.poiName =
                    value.length < 5
                        ? props.intl.formatMessage({
                              ...messages.atLeast5Character,
                          })
                        : '';
                setPoiName(value);
                break;
            case 'latitude':
                error.latitude =
                    value.length === 0
                        ? props.intl.formatMessage({
                              ...messages.valueRequired,
                          })
                        : '';
                setLatitude(value);
                break;
            case 'longitude':
                error.longitude =
                    value.length === 0
                        ? props.intl.formatMessage({
                              ...messages.valueRequired,
                          })
                        : '';
                setLongitude(value);
                break;
            case 'address':
                error.address =
                    value.length < 5
                        ? props.intl.formatMessage({
                              ...messages.atLeast5Character,
                          })
                        : '';
                setAddress(value);
                break;
            // case 'zone':
            //     setZone(value);
            //     break;
            case 'companyName':
                error.companyName =
                    value.length < 5
                        ? props.intl.formatMessage({
                              ...messages.atLeast5Character,
                          })
                        : '';
                setCompanyName(value);
                break;
            case 'companyId':
                error.companyId =
                    value.length < 5
                        ? props.intl.formatMessage({
                              ...messages.atLeast5Character,
                          })
                        : '';
                setCompanyId(value);
                break;
            case 'contactPerson':
                error.contactPerson =
                    value.length < 5
                        ? props.intl.formatMessage({
                              ...messages.atLeast5Character,
                          })
                        : '';
                setContactPerson(value);
                break;
            case 'phoneNum':
                error.phoneNum =
                    value.length < 11
                        ? props.intl.formatMessage({
                              ...messages.invalidNumber,
                          })
                        : '';
                setPhoneNum(value);
                break;
            case 'mobileNum':
                error.mobileNum =
                    value.length < 11
                        ? props.intl.formatMessage({
                              ...messages.invalidNumber,
                          })
                        : '';
                setMobileNum(value);
                break;
            case 'email':
                error.email = validEmailRegex.test(value)
                    ? ''
                    : props.intl.formatMessage({ ...messages.notValidEmail });

                setEmail(value);
                break;
        }
        setErrors(error);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const body = {
            type: 1,
            name: poiName,
            geoLocation: {
                type: 'Point',
                coordinates: [latitude, longitude],
            },
            address: address,
            color: color,
            markerShop: markerShop,
            // contactPersion: contactPerson,
            // mobileNo: mobileNum,
            // phoneNO: phoneNum,
        };
        console.log('Payload for Submitted : ', body);
        //props.history.goBack();
    };

    useEffect(() => {}, []);

    return (
        <div>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.newPoi })}
                </title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.newPoi} />} />

            <div>
                <Grid item sm={12} md={8} className={classes.root}>
                    <div className={classes.container}>
                        <RadioGroup
                            className={classes.radioContainer}
                            row
                            aria-label="position"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel
                                value="private"
                                checked={type === 'private' ? true : false}
                                control={<Radio color="secondary" />}
                                label="Private"
                                onChange={handleTypeChange}
                                className={classes.radioGroup}
                            />
                            <FormControlLabel
                                value="business"
                                checked={type === 'business' ? true : false}
                                control={<Radio color="secondary" />}
                                label="Business"
                                onChange={handleTypeChange}
                                className={classes.radioGroup}
                            />
                        </RadioGroup>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.poiName} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={poiName}
                                name="poiName"
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterPoiName,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                            {errors.poiName.length > 0 && (
                                <span className={classes.error}>
                                    {errors.poiName}
                                </span>
                            )}
                        </Grid>

                        {type === 'business' && (
                            <>
                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        className={classes.label}
                                    >
                                        <FormattedMessage
                                            {...messages.companyName}
                                        />
                                    </Typography>
                                    <Input
                                        className={classes.textInput}
                                        value={companyName}
                                        name="companyName"
                                        placeholder={props.intl.formatMessage({
                                            ...messages.enterCompanyName,
                                        })}
                                        onChange={handleChange}
                                        disableUnderline
                                    />
                                    {errors.companyName.length > 0 && (
                                        <span className={classes.error}>
                                            {errors.companyName}
                                        </span>
                                    )}
                                </Grid>

                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        className={classes.label}
                                    >
                                        <FormattedMessage
                                            {...messages.companyId}
                                        />
                                    </Typography>
                                    <Input
                                        className={classes.textInput}
                                        value={companyId}
                                        name="companyId"
                                        placeholder={props.intl.formatMessage({
                                            ...messages.enterCompanyId,
                                        })}
                                        onChange={handleChange}
                                        disableUnderline
                                    />
                                    {errors.companyId.length > 0 && (
                                        <span className={classes.error}>
                                            {errors.companyId}
                                        </span>
                                    )}
                                </Grid>

                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        className={classes.label}
                                    >
                                        <FormattedMessage
                                            {...messages.contactPerson}
                                        />
                                    </Typography>
                                    <Input
                                        className={classes.textInput}
                                        value={contactPerson}
                                        name="contactPerson"
                                        placeholder={props.intl.formatMessage({
                                            ...messages.enterContactPerson,
                                        })}
                                        onChange={handleChange}
                                        disableUnderline
                                    />
                                    {errors.contactPerson.length > 0 && (
                                        <span className={classes.error}>
                                            {errors.contactPerson}
                                        </span>
                                    )}
                                </Grid>

                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        className={classes.label}
                                    >
                                        <FormattedMessage
                                            {...messages.phoneNum}
                                        />
                                    </Typography>
                                    <Input
                                        className={classes.textInput}
                                        value={phoneNum}
                                        name="phoneNum"
                                        placeholder={props.intl.formatMessage({
                                            ...messages.enterPhoneNum,
                                        })}
                                        onChange={handleChange}
                                        disableUnderline
                                        type="number"
                                    />
                                    {errors.phoneNum.length > 0 && (
                                        <span className={classes.error}>
                                            {errors.phoneNum}
                                        </span>
                                    )}
                                </Grid>

                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        className={classes.label}
                                    >
                                        <FormattedMessage
                                            {...messages.mobileNum}
                                        />
                                    </Typography>
                                    <Input
                                        className={classes.textInput}
                                        value={mobileNum}
                                        name="mobileNum"
                                        placeholder={props.intl.formatMessage({
                                            ...messages.enterMobileNum,
                                        })}
                                        onChange={handleChange}
                                        disableUnderline
                                        type="number"
                                    />
                                    {errors.mobileNum.length > 0 && (
                                        <span className={classes.error}>
                                            {errors.mobileNum}
                                        </span>
                                    )}
                                </Grid>

                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        className={classes.label}
                                    >
                                        <FormattedMessage {...messages.email} />
                                    </Typography>
                                    <Input
                                        className={classes.textInput}
                                        value={email}
                                        name="email"
                                        placeholder={props.intl.formatMessage({
                                            ...messages.enterEmail,
                                        })}
                                        onChange={handleChange}
                                        disableUnderline
                                        type="email"
                                    />
                                    {errors.email.length > 0 && (
                                        <span className={classes.error}>
                                            {errors.email}
                                        </span>
                                    )}
                                </Grid>
                            </>
                        )}

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.latitude} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={latitude}
                                name="latitude"
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterLatitude,
                                })}
                                onChange={handleChange}
                                disableUnderline
                                type="number"
                            />
                            {errors.latitude.length > 0 && (
                                <span className={classes.error}>
                                    {errors.latitude}
                                </span>
                            )}
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.longitude} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={longitude}
                                name="longitude"
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterLongitude,
                                })}
                                onChange={handleChange}
                                disableUnderline
                                type="number"
                            />
                            {errors.longitude.length > 0 && (
                                <span className={classes.error}>
                                    {errors.longitude}
                                </span>
                            )}
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.address} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={address}
                                name="address"
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterAddress,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                            {errors.address.length > 0 && (
                                <span className={classes.error}>
                                    {errors.address}
                                </span>
                            )}
                        </Grid>

                        {/* <Grid item>
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
            </Grid> */}

                        <Grid item className={classes.radioSelection}>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.color} />
                            </Typography>

                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={color === POICOLORS['1']}
                                            onChange={handleColorChange}
                                            value={POICOLORS['1']}
                                        />
                                        <div
                                            style={{
                                                display: 'inline',
                                                width: '50px',
                                                height: '20px',
                                                backgroundColor: POICOLORS['1'],
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={color === POICOLORS['2']}
                                            onChange={handleColorChange}
                                            value={POICOLORS['2']}
                                        />
                                        <div
                                            style={{
                                                display: 'inline',
                                                width: '50px',
                                                height: '20px',
                                                backgroundColor: POICOLORS['2'],
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={color === POICOLORS['3']}
                                            onChange={handleColorChange}
                                            value={POICOLORS['3']}
                                        />
                                        <div
                                            style={{
                                                display: 'inline',
                                                width: '50px',
                                                height: '20px',
                                                backgroundColor: POICOLORS['3'],
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={color === POICOLORS['4']}
                                            onChange={handleColorChange}
                                            value={POICOLORS['4']}
                                        />
                                        <div
                                            style={{
                                                display: 'inline',
                                                width: '50px',
                                                height: '20px',
                                                backgroundColor: POICOLORS['4'],
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={color === POICOLORS['5']}
                                            onChange={handleColorChange}
                                            value={POICOLORS['5']}
                                        />
                                        <div
                                            style={{
                                                display: 'inline',
                                                width: '50px',
                                                height: '20px',
                                                backgroundColor: POICOLORS['5'],
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={color === POICOLORS['6']}
                                            onChange={handleColorChange}
                                            value={POICOLORS['6']}
                                        />
                                        <div
                                            style={{
                                                display: 'inline',
                                                width: '50px',
                                                height: '20px',
                                                backgroundColor: POICOLORS['6'],
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={color === POICOLORS['7']}
                                            onChange={handleColorChange}
                                            value={POICOLORS['7']}
                                        />
                                        <div
                                            style={{
                                                display: 'inline',
                                                width: '50px',
                                                height: '20px',
                                                backgroundColor: POICOLORS['7'],
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={color === POICOLORS['8']}
                                            onChange={handleColorChange}
                                            value={POICOLORS['8']}
                                        />
                                        <div
                                            style={{
                                                display: 'inline',
                                                width: '50px',
                                                height: '20px',
                                                backgroundColor: POICOLORS['8'],
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item className={classes.radioSelection}>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.markerShop} />
                            </Typography>

                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={markerShop === '1'}
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
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={markerShop === '2'}
                                            onChange={handleMarkerChange}
                                            value="2"
                                        />
                                        <FontAwesomeIcon
                                            icon={faHome}
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={markerShop === '3'}
                                            onChange={handleMarkerChange}
                                            value="3"
                                        />
                                        <FontAwesomeIcon
                                            icon={faMapMarkerAlt}
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={markerShop === '4'}
                                            onChange={handleMarkerChange}
                                            value="4"
                                        />
                                        <FontAwesomeIcon
                                            icon={faIndustry}
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={markerShop === '5'}
                                            onChange={handleMarkerChange}
                                            value="5"
                                        />
                                        <FontAwesomeIcon
                                            icon={faFlag}
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={markerShop === '6'}
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
                        <Button
                            size="medium"
                            className={classes.btnBlue}
                            onClick={handleSubmit}
                        >
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
