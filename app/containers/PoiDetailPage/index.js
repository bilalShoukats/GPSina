/**
 *
 * PoiDetailPage
 *
 */

import * as Yup from 'yup';
import { compose } from 'redux';
import messages from './messages';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useStyles } from './styles.js';
import Header from '../../components/Header';
import APIURLS from '../../ApiManager/apiUrl';
import { Formik, ErrorMessage } from 'formik';
import ApiManager from '../../ApiManager/ApiManager';
import { FormattedMessage, injectIntl } from 'react-intl';
import React, { useState, useRef, useEffect } from 'react';
import { POICOLORS, MARKER, TYPE } from '../../constants/poi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Grid,
    Input,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';

export function PoiDetailPage(props) {
    const classes = useStyles(props);

    const formikRef = useRef();

    const [poiId, setPoiID] = useState('');
    const [clickBtn, setClickBtn] = useState(false);
    const [type, setType] = useState(TYPE[0]);
    const [markerShop, setMarkerShop] = useState(MARKER[0]);
    const [color, setColor] = useState(POICOLORS[0]);

    const initialValues = {
        poiName: '',
        latitude: '',
        longitude: '',
        address: '',
        companyName: '',
        companyId: '',
        contactPerson: '',
        phoneNum: '',
        mobileNum: '',
        email: '',
    };

    const validationSchema = Yup.object({
        poiName: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        latitude: Yup.number()
            .min(-180, 'Must be -180 or more')
            .max(180, 'Must be +180 or less')
            .required('Required'),
        longitude: Yup.number()
            .min(-90, 'Must be -90 or more')
            .max(90, 'Must be +90 or less')
            .required('Required'),
        address: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        companyName: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(20, 'Must be 20 characters or less'),
        companyId: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(20, 'Must be 20 characters or less'),
        contactPerson: Yup.string()
            .matches(/^\d+$/, 'The field should have digits only')
            .min(9, 'Must be 9 characters or more')
            .max(20, 'Must be 20 characters or less'),
        phoneNum: Yup.string()
            .matches(/^\d+$/, 'The field should have digits only')
            .min(9, 'Must be 9 characters or more')
            .max(20, 'Must be 20 characters or less'),
        mobileNum: Yup.string()
            .matches(/^\d+$/, 'The field should have digits only')
            .min(9, 'Must be 9 characters or more')
            .max(20, 'Must be 20 characters or less'),
        email: Yup.string()
            .email('Invalid email address')
            .min(8, 'Must be 8 characters or more')
            .max(50, 'Must be 50 characters or less'),
    });

    const updatePoi = body => {
        console.log('Body for update poi : ', body);
        setClickBtn(true);
        const api = ApiManager.getInstance();
        api.send('POST', APIURLS.updatePoi, body)
            .then(res => {
                setClickBtn(false);
                console.log('Update poi response : ', res);
                if (res.data.code === 1014) {
                    props.history.goBack();
                    console.log('Updated Succesfully...');
                } else {
                    console.log('Bad body request for update zone');
                }
            })
            .catch(error => {
                setClickBtn(false);
                console.log('Error poi : ', error);
            });
    };

    useEffect(() => {
        console.log('Detail useEffect POI : ', props.location.state);
        const { poi } = props.location.state;
        if (poi) {
            if (formikRef.current) {
                formikRef.current.setFieldValue('poiName', poi.name);
                formikRef.current.setFieldValue(
                    'latitude',
                    poi.geoLocation.coordinates[0],
                );
                formikRef.current.setFieldValue(
                    'longitude',
                    poi.geoLocation.coordinates[1],
                );
                formikRef.current.setFieldValue('address', poi.driverPhone);
                formikRef.current.setFieldValue('companyName', poi.driverAge);
                // formikRef.current.setFieldValue('companyId', poi.gender);
                formikRef.current.setFieldValue(
                    'contactPerson',
                    poi.contactPersion,
                );
                formikRef.current.setFieldValue('phoneNum', poi.phoneNo);
                formikRef.current.setFieldValue('address', poi.address);
                formikRef.current.setFieldValue('mobileNum', poi.mobileNo);
                formikRef.current.setFieldValue('email', poi.companyEmail);
                setType(TYPE[poi.type - 1]);
                setColor(POICOLORS[poi.color - 1]);
                setMarkerShop(MARKER[poi.markerShop - 1]);
                setPoiID(poi.poId);
            }
        } else {
            props.history.goBack();
        }
    }, []);

    return (
        <Grid>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.newPoi })}
                </title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.newPoi} />} />
            <Grid item sm={12} md={8} className={classes.root}>
                <Formik
                    innerRef={formikRef}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        let body = {
                            poId: poiId,
                            type: type.value,
                            name: values.poiName,
                            geoLocation: {
                                type: 'Point',
                                coordinates: [
                                    values.latitude,
                                    values.longitude,
                                ],
                            },
                            address: values.address,
                            color: color.value,
                            markerShop: markerShop.value,
                            contactPersion: values.contactPerson,
                            mobileNo: values.mobileNum,
                            phoneNO: values.phoneNum,
                            companyEmail: values.email,
                        };
                        console.log('Body : ', body);
                        updatePoi(body);
                    }}
                >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <Grid className={classes.container}>
                                <RadioGroup
                                    className={classes.radioContainer}
                                    row
                                    aria-label="position"
                                    name="position"
                                    defaultValue="top"
                                >
                                    <FormControlLabel
                                        value={TYPE[0].value}
                                        checked={
                                            type.value === TYPE[0].value
                                                ? true
                                                : false
                                        }
                                        control={<Radio color="primary" />}
                                        label={TYPE[0].label}
                                        onChange={() => {
                                            setType(TYPE[0]);
                                        }}
                                        className={classes.radioGroup}
                                    />
                                    <FormControlLabel
                                        value={TYPE[1].value}
                                        checked={
                                            type.value === TYPE[1].value
                                                ? true
                                                : false
                                        }
                                        control={<Radio color="primary" />}
                                        label={TYPE[1].label}
                                        onChange={() => {
                                            setType(TYPE[1]);
                                        }}
                                        className={classes.radioGroup}
                                    />
                                </RadioGroup>
                            </Grid>

                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage {...messages.poiName} />
                                </Typography>
                                <Input
                                    type="text"
                                    id="poiName"
                                    name="poiName"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterPoiName,
                                    })}
                                    {...formik.getFieldProps('poiName')}
                                />
                                <ErrorMessage
                                    name="poiName"
                                    render={msg => (
                                        <Grid className={classes.error}>
                                            {msg}
                                        </Grid>
                                    )}
                                />
                            </Grid>
                            {type.value === TYPE[1].value && (
                                <Grid>
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
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterCompanyName,
                                                },
                                            )}
                                            {...formik.getFieldProps(
                                                'companyName',
                                            )}
                                        />
                                        <ErrorMessage
                                            name="companyName"
                                            render={msg => (
                                                <Grid className={classes.error}>
                                                    {msg}
                                                </Grid>
                                            )}
                                        />
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
                                            type="text"
                                            id="companyId"
                                            name="companyId"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterCompanyId,
                                                },
                                            )}
                                            {...formik.getFieldProps(
                                                'companyId',
                                            )}
                                        />
                                        <ErrorMessage
                                            name="companyId"
                                            render={msg => (
                                                <Grid className={classes.error}>
                                                    {msg}
                                                </Grid>
                                            )}
                                        />
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
                                            type="text"
                                            id="contactPerson"
                                            name="contactPerson"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterContactPerson,
                                                },
                                            )}
                                            {...formik.getFieldProps(
                                                'contactPerson',
                                            )}
                                        />
                                        <ErrorMessage
                                            name="contactPerson"
                                            render={msg => (
                                                <Grid className={classes.error}>
                                                    {msg}
                                                </Grid>
                                            )}
                                        />
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
                                            type="text"
                                            id="phoneNum"
                                            name="phoneNum"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterPhoneNum,
                                                },
                                            )}
                                            {...formik.getFieldProps(
                                                'phoneNum',
                                            )}
                                        />
                                        <ErrorMessage
                                            name="phoneNum"
                                            render={msg => (
                                                <Grid className={classes.error}>
                                                    {msg}
                                                </Grid>
                                            )}
                                        />
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
                                            type="text"
                                            id="mobileNum"
                                            name="mobileNum"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterMobileNum,
                                                },
                                            )}
                                            {...formik.getFieldProps(
                                                'mobileNum',
                                            )}
                                        />
                                        <ErrorMessage
                                            name="mobileNum"
                                            render={msg => (
                                                <Grid className={classes.error}>
                                                    {msg}
                                                </Grid>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            className={classes.label}
                                        >
                                            <FormattedMessage
                                                {...messages.email}
                                            />
                                        </Typography>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterEmail,
                                                },
                                            )}
                                            {...formik.getFieldProps('email')}
                                        />
                                        <ErrorMessage
                                            name="email"
                                            render={msg => (
                                                <Grid className={classes.error}>
                                                    {msg}
                                                </Grid>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            )}

                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage {...messages.latitude} />
                                </Typography>
                                <Input
                                    type="number"
                                    id="latitude"
                                    name="latitude"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterLatitude,
                                    })}
                                    {...formik.getFieldProps('latitude')}
                                />
                                <ErrorMessage
                                    name="latitude"
                                    render={msg => (
                                        <Grid className={classes.error}>
                                            {msg}
                                        </Grid>
                                    )}
                                />
                            </Grid>

                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage {...messages.longitude} />
                                </Typography>
                                <Input
                                    type="number"
                                    id="longitude"
                                    name="longitude"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterLongitude,
                                    })}
                                    {...formik.getFieldProps('longitude')}
                                />
                                <ErrorMessage
                                    name="longitude"
                                    render={msg => (
                                        <Grid className={classes.error}>
                                            {msg}
                                        </Grid>
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage {...messages.address} />
                                </Typography>
                                <Input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterAddress,
                                    })}
                                    {...formik.getFieldProps('address')}
                                />
                                <ErrorMessage
                                    name="address"
                                    render={msg => (
                                        <Grid className={classes.error}>
                                            {msg}
                                        </Grid>
                                    )}
                                />
                            </Grid>

                            <Grid item>
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
                                                color="primary"
                                                checked={
                                                    color.color ===
                                                    POICOLORS[0].color
                                                }
                                                onChange={() => {
                                                    setColor(POICOLORS[0]);
                                                }}
                                                value={POICOLORS[0].color}
                                            />
                                            <Grid
                                                style={{
                                                    display: 'inline',
                                                    width: '50px',
                                                    height: '20px',
                                                    backgroundColor:
                                                        POICOLORS[0].color,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    color.color ===
                                                    POICOLORS[1].color
                                                }
                                                onChange={() => {
                                                    setColor(POICOLORS[1]);
                                                }}
                                                value={POICOLORS[1].color}
                                            />
                                            <Grid
                                                style={{
                                                    display: 'inline',
                                                    width: '50px',
                                                    height: '20px',
                                                    backgroundColor:
                                                        POICOLORS[1].color,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    color.color ===
                                                    POICOLORS[2].color
                                                }
                                                onChange={() => {
                                                    setColor(POICOLORS[2]);
                                                }}
                                                value={POICOLORS[2].color}
                                            />
                                            <Grid
                                                style={{
                                                    display: 'inline',
                                                    width: '50px',
                                                    height: '20px',
                                                    backgroundColor:
                                                        POICOLORS[2].color,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    color.color ===
                                                    POICOLORS[3].color
                                                }
                                                onChange={() => {
                                                    setColor(POICOLORS[3]);
                                                }}
                                                value={POICOLORS[3].color}
                                            />
                                            <Grid
                                                style={{
                                                    display: 'inline',
                                                    width: '50px',
                                                    height: '20px',
                                                    backgroundColor:
                                                        POICOLORS[3].color,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    color.color ===
                                                    POICOLORS[4].color
                                                }
                                                onChange={() => {
                                                    setColor(POICOLORS[4]);
                                                }}
                                                value={POICOLORS[4].color}
                                            />
                                            <Grid
                                                style={{
                                                    display: 'inline',
                                                    width: '50px',
                                                    height: '20px',
                                                    backgroundColor:
                                                        POICOLORS[4].color,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    color.color ===
                                                    POICOLORS[5].color
                                                }
                                                onChange={() => {
                                                    setColor(POICOLORS[5]);
                                                }}
                                                value={POICOLORS[5].color}
                                            />
                                            <Grid
                                                style={{
                                                    display: 'inline',
                                                    width: '50px',
                                                    height: '20px',
                                                    backgroundColor:
                                                        POICOLORS[5].color,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    color.color ===
                                                    POICOLORS[6].color
                                                }
                                                onChange={() => {
                                                    setColor(POICOLORS[6]);
                                                }}
                                                value={POICOLORS[6].color}
                                            />
                                            <Grid
                                                style={{
                                                    display: 'inline',
                                                    width: '50px',
                                                    height: '20px',
                                                    backgroundColor:
                                                        POICOLORS[6].color,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    color.color ===
                                                    POICOLORS[7].color
                                                }
                                                onChange={() => {
                                                    setColor(POICOLORS[7]);
                                                }}
                                                value={POICOLORS[7].color}
                                            />
                                            <Grid
                                                style={{
                                                    display: 'inline',
                                                    width: '50px',
                                                    height: '20px',
                                                    backgroundColor:
                                                        POICOLORS[7].color,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage
                                        {...messages.markerShop}
                                    />
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
                                                color="primary"
                                                checked={
                                                    markerShop.value ===
                                                    MARKER[0].value
                                                }
                                                onChange={() => {
                                                    setMarkerShop(MARKER[0]);
                                                }}
                                                value={MARKER[0].value}
                                            />
                                            <FontAwesomeIcon
                                                icon={MARKER[0].icon}
                                                color="#FFFFFF"
                                                size="lg"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    markerShop.value ===
                                                    MARKER[1].value
                                                }
                                                onChange={() => {
                                                    setMarkerShop(MARKER[1]);
                                                }}
                                                value={MARKER[1].value}
                                            />
                                            <FontAwesomeIcon
                                                icon={MARKER[1].icon}
                                                color="#FFFFFF"
                                                size="lg"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    markerShop.value ===
                                                    MARKER[2].value
                                                }
                                                onChange={() => {
                                                    setMarkerShop(MARKER[2]);
                                                }}
                                                value={MARKER[2].value}
                                            />
                                            <FontAwesomeIcon
                                                icon={MARKER[2].icon}
                                                color="#FFFFFF"
                                                size="lg"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    markerShop.value ===
                                                    MARKER[3].value
                                                }
                                                onChange={() => {
                                                    setMarkerShop(MARKER[3]);
                                                }}
                                                value={MARKER[3].value}
                                            />
                                            <FontAwesomeIcon
                                                icon={MARKER[3].icon}
                                                color="#FFFFFF"
                                                size="lg"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    markerShop.value ===
                                                    MARKER[4].value
                                                }
                                                onChange={() => {
                                                    setMarkerShop(MARKER[4]);
                                                }}
                                                value={MARKER[4].value}
                                            />
                                            <FontAwesomeIcon
                                                icon={MARKER[4].icon}
                                                color="#FFFFFF"
                                                size="lg"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                color="primary"
                                                checked={
                                                    markerShop.value ===
                                                    MARKER[5].value
                                                }
                                                onChange={() => {
                                                    setMarkerShop(MARKER[5]);
                                                }}
                                                value={MARKER[5].value}
                                            />
                                            <FontAwesomeIcon
                                                icon={MARKER[5].icon}
                                                color="#FFFFFF"
                                                size="lg"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                                className={classes.btnContainer}
                            >
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    size="medium"
                                    disabled={clickBtn}
                                    className={classes.btnBlue}
                                >
                                    <Typography variant="body1">
                                        <FormattedMessage
                                            {...messages.submit}
                                        />
                                    </Typography>
                                </Button>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
}

PoiDetailPage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(PoiDetailPage));
