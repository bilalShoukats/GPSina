/**
 *
 * PoiDetailPage
 *
 */

import saga from './saga';
import reducer from './reducer';
import { compose } from 'redux';
import messages from './messages';
import PropTypes from 'prop-types';
import POICOLORS from './poiColors';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useStyles } from './styles.js';
import Header from '../../components/Header';
import { useInjectSaga } from 'utils/injectSaga';
import makeSelectPoiDetailPage from './selectors';
import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    FormControlLabel,
    Grid,
    Input,
    Radio,
    RadioGroup,
    Typography,
} from '@material-ui/core';
import {
    faBuilding,
    faFlag,
    faHome,
    faIndustry,
    faMapMarkerAlt,
    faStreetView,
} from '@fortawesome/free-solid-svg-icons';
import ApiManager from '../../ApiManager/ApiManager';
import APIURLS from '../../ApiManager/apiUrl';

export function PoiDetailPage(props) {
    useInjectReducer({ key: 'poiDetailPage', reducer });
    useInjectSaga({ key: 'poiDetailPage', saga });

    const classes = useStyles(props);
    const [zone, setZone] = useState('');
    const [poId, setPoId] = useState('');
    const [email, setEmail] = useState('');
    const [poiName, setPoiName] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('private');
    const [phoneNum, setPhoneNum] = useState('');
    const [latitude, setLatitude] = useState('');
    const [color, setColor] = useState('#0F0F0F');
    const [longitude, setLongitude] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [mobileNum, setMobileNum] = useState('');
    const [markerShop, setMarkerShop] = useState('1');
    const [companyName, setCompanyName] = useState('');
    const [isEditMode, setisEditmode] = useState(true);
    const [contactPerson, setContactPerson] = useState('');
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

    const handleEditMode = () => {
        if (isEditMode) {
            if (isEditMode) {
                if (validateForm(errors)) {
                    const body = {
                        type: 2,
                        name: poiName,
                        poId: poId,
                        geoLocation: {
                            type: 'Point',
                            coordinates: [latitude, longitude],
                        },
                        address: address,
                        color: getColorIndex(color),
                        markerShop: parseInt(markerShop),
                        contactPersion: contactPerson,
                        mobileNo: mobileNum,
                        phoneNO: phoneNum,
                    };

                    if (type === 'private') {
                        body.type = 1;
                        if (
                            poiName == '' ||
                            latitude === '' ||
                            longitude === '' ||
                            address == ''
                        ) {
                            console.log('Required all Feilds 1');
                        } else {
                            updatePoi(body);
                        }
                    } else {
                        if (
                            poiName == '' ||
                            latitude == '' ||
                            longitude == '' ||
                            address == '' ||
                            contactPerson == '' ||
                            mobileNum == '' ||
                            phoneNum == ''
                        ) {
                            console.log('Required all Feilds 2');
                        } else {
                            updatePoi(body);
                        }
                    }
                } else {
                    console.log('You have errors');
                }
            }
        }
        handleSubmit();
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

    const getIcon = icon => {
        switch (icon) {
            case 1:
                return '1';

            case 2:
                return '2';

            case 3:
                return '3';

            case 4:
                return '4';

            case 5:
                return '5';

            case 6:
                return '6';

            default:
                return '1';
        }
    };

    const updatePoi = body => {
        console.log('Body for update poi : ', body);
        const api = ApiManager.getInstance();
        api.send('POST', APIURLS.updatePoi, body)
            .then(res => {
                console.log('Update poi response : ', res);
                if (res.data.code === 1014) {
                    props.history.goBack();
                    console.log('Updated Succesfully...');
                } else {
                    console.log('Bad body request for update zone');
                }
            })
            .catch(error => {
                console.log('Error poi : ', error);
            });
    };

    const handleSubmit = () => {
        setisEditmode(!isEditMode);
    };
    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    };

    const getColorIndex = color => {
        if (color === POICOLORS['1']) return 1;
        else if (color === POICOLORS['2']) return 2;
        else if (color === POICOLORS['3']) return 3;
        else if (color === POICOLORS['4']) return 4;
        else if (color === POICOLORS['5']) return 5;
        else if (color === POICOLORS['6']) return 6;
        else if (color === POICOLORS['7']) return 7;
        return 8;
    };

    useEffect(() => {
        console.log('Detail useEffect POI : ', props.location.state);
        if (props.location.state.poi) {
            const poi = props.location.state.poi;
            setPoId(poi.poId);
            setAddress(poi.address);
            setColor(POICOLORS[poi.color]);
            setLatitude(poi.geoLocation.coordinates[0]);
            setLongitude(poi.geoLocation.coordinates[1]);
            setMarkerShop(getIcon(poi.markerShop));
            setPoiName(poi.name);
            setType(poi.type === 1 ? 'private' : 'business');
            setZone(poi.zone);
            if (poi.type === 'business') {
                setCompanyName(poi.company_name);
                setCompanyId(poi.company_id);
                setContactPerson(poi.contact_person);
                setEmail(poi.email);
                setMobileNum(poi.mobile_num);
                setPhoneNum(poi.phone_num);
            }
        } else {
            props.history.goBack();
        }
    }, []);

    return (
        <div>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.poiDetail })}
                </title>
            </Helmet>
            <Header
                title={<FormattedMessage {...messages.poiDetail} />}
                showEditBtn
                onEdit={handleEditMode}
                isEditMode={isEditMode}
            />

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
                                control={<Radio color="primary" />}
                                label="Private"
                                onChange={handleTypeChange}
                                className={classes.radioGroup}
                                disabled={!isEditMode}
                            />
                            <FormControlLabel
                                value="business"
                                checked={type === 'business' ? true : false}
                                control={<Radio color="primary" />}
                                label="Business"
                                onChange={handleTypeChange}
                                className={classes.radioGroup}
                                disabled={!isEditMode}
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
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
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
                                        style={
                                            !isEditMode
                                                ? { color: '#ABABAB' }
                                                : {}
                                        }
                                        disabled={!isEditMode}
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
                                        style={
                                            !isEditMode
                                                ? { color: '#ABABAB' }
                                                : {}
                                        }
                                        disabled={!isEditMode}
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
                                        style={
                                            !isEditMode
                                                ? { color: '#ABABAB' }
                                                : {}
                                        }
                                        disabled={!isEditMode}
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
                                        type="number"
                                        name="phoneNum"
                                        style={
                                            !isEditMode
                                                ? { color: '#ABABAB' }
                                                : {}
                                        }
                                        disabled={!isEditMode}
                                        placeholder={props.intl.formatMessage({
                                            ...messages.enterPhoneNum,
                                        })}
                                        onChange={handleChange}
                                        disableUnderline
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
                                        type="number"
                                        name="mobileNum"
                                        style={
                                            !isEditMode
                                                ? { color: '#ABABAB' }
                                                : {}
                                        }
                                        disabled={!isEditMode}
                                        placeholder={props.intl.formatMessage({
                                            ...messages.enterMobileNum,
                                        })}
                                        onChange={handleChange}
                                        disableUnderline
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
                                        type="email"
                                        name="email"
                                        style={
                                            !isEditMode
                                                ? { color: '#ABABAB' }
                                                : {}
                                        }
                                        disabled={!isEditMode}
                                        placeholder={props.intl.formatMessage({
                                            ...messages.enterEmail,
                                        })}
                                        onChange={handleChange}
                                        disableUnderline
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
                                type="number"
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterLatitude,
                                })}
                                onChange={handleChange}
                                disableUnderline
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
                                type="number"
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterLongitude,
                                })}
                                onChange={handleChange}
                                disableUnderline
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
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
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
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.zone} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={zone}
                                name="zone"
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterZone,
                                })}
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
                                            disabled={!isEditMode}
                                            onChange={handleColorChange}
                                            color="primary"
                                            color="primary"
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
                                            disabled={!isEditMode}
                                            onChange={handleColorChange}
                                            color="primary"
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
                                            disabled={!isEditMode}
                                            onChange={handleColorChange}
                                            color="primary"
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
                                            disabled={!isEditMode}
                                            onChange={handleColorChange}
                                            color="primary"
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
                                            disabled={!isEditMode}
                                            onChange={handleColorChange}
                                            color="primary"
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
                                            disabled={!isEditMode}
                                            onChange={handleColorChange}
                                            color="primary"
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
                                            disabled={!isEditMode}
                                            onChange={handleColorChange}
                                            color="primary"
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
                                            disabled={!isEditMode}
                                            onChange={handleColorChange}
                                            color="primary"
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
                                            disabled={!isEditMode}
                                            onChange={handleMarkerChange}
                                            color="primary"
                                            value="1"
                                        />
                                        <FontAwesomeIcon
                                            icon={faBuilding}
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                        {/* <BuildRounded fontSize="large" /> */}
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={markerShop === '2'}
                                            disabled={!isEditMode}
                                            onChange={handleMarkerChange}
                                            color="primary"
                                            value="2"
                                        />
                                        <FontAwesomeIcon
                                            icon={faHome}
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                        {/* <Home fontSize="large" /> */}
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={markerShop === '3'}
                                            disabled={!isEditMode}
                                            onChange={handleMarkerChange}
                                            color="primary"
                                            value="3"
                                        />
                                        <FontAwesomeIcon
                                            icon={faMapMarkerAlt}
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                        {/* <LocalActivity fontSize="large" /> */}
                                    </Grid>
                                </Grid>

                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={markerShop === '4'}
                                            disabled={!isEditMode}
                                            onChange={handleMarkerChange}
                                            color="primary"
                                            value="4"
                                        />
                                        <FontAwesomeIcon
                                            icon={faIndustry}
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                        {/* <BuildSharp fontSize="large" /> */}
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={markerShop === '5'}
                                            disabled={!isEditMode}
                                            onChange={handleMarkerChange}
                                            color="primary"
                                            value="5"
                                        />
                                        <FontAwesomeIcon
                                            icon={faFlag}
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                        {/* <FlagOutlined fontSize="large" /> */}
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid container alignItems="center">
                                        <Radio
                                            checked={markerShop === '6'}
                                            disabled={!isEditMode}
                                            onChange={handleMarkerChange}
                                            color="primary"
                                            value="6"
                                        />
                                        <FontAwesomeIcon
                                            icon={faStreetView}
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                        {/* <Person fontSize="large" /> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </div>
        </div>
    );
}

PoiDetailPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    poiDetailPage: makeSelectPoiDetailPage(),
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

export default compose(withConnect)(injectIntl(PoiDetailPage));
