import * as yup from 'yup';
import { compose } from 'redux';
import messages from './messages';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useStyles } from './styles.js';
import Header from '../../components/Header';
import APIURLS from '../../ApiManager/apiUrl';
import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import ApiManager from '../../ApiManager/ApiManager';
import UserAvatar from '../../components/UserAvatar';
import { FormattedMessage, injectIntl } from 'react-intl';
import satellite from '../../../assets/images/icons/satellite.svg';
import {
    Button,
    Grid,
    Input,
    TextField,
    Typography,
    Radio,
} from '@material-ui/core';
import CustomModal from '../../components/CustomModal';
import { Digital } from 'react-activity';

export function AddDevicePage(props) {
    
    const classes = useStyles(props);
    const api = ApiManager.getInstance();

    const [activeDevice, setActiveDevice] = useState('');
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalDescription, setModalDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        softwareVersion: yup
            .string('Enter software version')
            // .matches(/^\d{1,2}\.\d{1,2}\.\d{1,2}$/, {
            .matches(/^[A-Z0-9_]*$/, {
                excludeEmptyString: true,
                message: 'please enter valid software version',
            })
            .min(2, 'software version should be of minimum 2 characters length')
            .required('software version is required'),
        trackerNumber: yup
            .string('Enter tracker number')
            .min(2, 'tracker number should be of minimum 2 characters length')
            .required('tracker number is required'),
    });

    const handleCloseModal = message => {
        setIsModalShown(false);
    };

    const handleOpenModal = () => {
        setIsModalShown(true);
    };

    const formik = useFormik({
        initialValues: {
            trackerNumber: '',
            softwareVersion: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            // console.log("onSubmit>>>",onSubmit)
            setLoading(true);
            const body = {
                device:{
                    deviceID: ""+values.trackerNumber
                    ,
                } ,
                vehicle: {
                   registrationNo:"vehicleNo" ,
                   color: "red",
                   vehicleType : 2,
                   fuelType:1,
                   mileage:"200",
                   engineNo:"engine",
                   chassis:"chassis",
                   vehicleModel:"200",
                },
            };
            api.send('POST', APIURLS.addDevice, body)
            console.log("addDevice",addDevice)
                .then(res => {
                    setLoading(false);
                    console.log(
                        'Body for add device',
                        body,
                        'Response add device',
                    );
                    if (res.data.code === 1008) {
                        props.history.goBack();
                    } else {
                        setModalTitle(
                            props.intl.formatMessage({
                                ...messages.generalError,
                            }),
                        );
                        setModalDescription(res.data.id);
                        handleOpenModal();
                        console.log('Bad Body ADD DEVICE');
                    }
                })
                .catch(error => {
                    setModalTitle(
                        props.intl.formatMessage({
                            ...messages.generalError,
                        }),
                    );
                    setModalDescription(
                        props.intl.formatMessage({
                            ...messages.notSuccess,
                        }),
                    );
                    setLoading(false);
                    handleOpenModal();
                    console.log('Error', error);
                });
        },
    });

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let error = errors;
        const validVersionRegex = RegExp();
        switch (name) {
            case 'softwareVersion':
                error.softwareVersion = validVersionRegex.test(value)
                    ? ''
                    : props.intl.formatMessage({ ...messages.validRegEx });

                setSoftwareVersion(value);
                break;
            case 'trackerNumber':
                error.trackerNumber =
                    value.length < 5
                        ? props.intl.formatMessage({
                              ...messages.atLeast5Character,
                          })
                        : '';
                setTrackerNumber(parseInt(value));
                break;
        }
        setErrors(error);
    };

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    };

    return (
        <Grid>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.addDevice })}
                </title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.addDevice} />} />
            <Grid>
                <Grid item sm={12} md={8} className={classes.root}>
                    <CustomModal
                        open={isModalShown}
                        handleClose={() => handleCloseModal()}
                        type="simple"
                        title={modalTitle}
                        description={modalDescription}
                    />
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.avatar}
                    >
                        <UserAvatar
                            alt="Device Avatar"
                            src={satellite}
                            style={{ width: '100px', height: '100px' }}
                        />
                    </Grid>

                    <Grid className={classes.container}>
                        <Typography variant="h5" className={classes.title}>
                            <FormattedMessage {...messages.deviceInformation} />
                        </Typography>
                        <form onSubmit={formik.handleSubmit} id="myForm">
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage
                                        {...messages.softwareVersion}
                                    />
                                </Typography>
                                <TextField
                                    id="softwareVersion"
                                    name="softwareVersion"
                                    className={classes.textInput}
                                    value={formik.values.softwareVersion}
                                    InputProps={{
                                        classes: { input: classes.textColor },
                                    }}
                                    onChange={formik.handleChange}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterSoftware,
                                    })}
                                    error={
                                        formik.touched.softwareVersion &&
                                        Boolean(formik.errors.softwareVersion)
                                    }
                                    helperText={
                                        formik.touched.softwareVersion &&
                                        formik.errors.softwareVersion
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage
                                        {...messages.trackerNumber}
                                    />
                                </Typography>
                                <TextField
                                    type="number"
                                    id="trackerNumber"
                                    name="trackerNumber"
                                    className={classes.textInput}
                                    value={formik.values.trackerNumber}
                                    InputProps={{
                                        classes: { input: classes.textColor },
                                    }}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterTracker,
                                    })}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.trackerNumber &&
                                        Boolean(formik.errors.trackerNumber)
                                    }
                                    helperText={
                                        formik.touched.trackerNumber &&
                                        formik.errors.trackerNumber
                                    }
                                />
                                {/* {formik.touched.trackerNumber &&
                                    Boolean(formik.errors.trackerNumber) && (
                                        <span className={classes.error}>
                                            {errors.trackerNumber}
                                        </span>
                                    )} */}
                            </Grid>

                            <Grid item className={classes.radioSelection}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Grid container alignItems="center">
                                            <Radio
                                                checked={activeDevice}
                                                onChange={() => {
                                                    if (activeDevice === '')
                                                        setActiveDevice(
                                                            'activeDevice',
                                                        );
                                                    else setActiveDevice('');
                                                }}
                                                value={activeDevice}
                                                style={{ color: '#28ACEA' }}
                                            />
                                            <Typography
                                                variant="body1"
                                                className={classes.label}
                                            >
                                                <FormattedMessage
                                                    {...messages.activeDevice}
                                                />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.btnContainer}
                    >
                        {!loading && (
                            <Button
                                form="myForm"
                                size="medium"
                                type="submit"
                                color="primary"
                                variant="contained"
                                className={classes.btnBlue}
                                //onSubmit={formik.handleSubmit}
                            >
                                <Typography variant="body1">
                                    <FormattedMessage {...messages.submit} />
                                </Typography>
                            </Button>
                        )}
                        {loading && (
                            <Digital
                                color="#ffa500"
                                size={32}
                                speed={1}
                                animating={loading}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
AddDevicePage.propTypes = {};

const mapStateToProps = state => {
    console.log('state', state.auth.user);

    const { auth } = state;
    return auth;
};

const withConnect = connect(
    mapStateToProps
);

export default compose(withConnect)(injectIntl(AddDevicePage));
