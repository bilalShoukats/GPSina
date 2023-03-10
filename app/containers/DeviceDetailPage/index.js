import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import messages from './messages';
import Header from '../../components/Header';
import ApiManager from '../../ApiManager/ApiManager';
import APIURLS from '../../ApiManager/apiUrl';
import { useStyles } from './styles.js';
import { Button, Grid, Input, Typography, Radio } from '@material-ui/core';
import UserAvatar from '../../components/UserAvatar';
import satellite from '../../../assets/images/icons/satellite.svg';

export function DeviceDetailPage(props) {
    const classes = useStyles(props);
    const [softwareVersion, setSoftwareVersion] = useState('');
    const [trackerNumber, setTrackerNumber] = useState('');
    const [activeDevice, setActiveDevice] = useState('');
    const [isEditMode, setisEditmode] = useState(false);
    const [errors, setErrors] = useState({
        softwareVersion: '',
        trackerNumber: '',
    });

    const handleEditMode = e => {
        if (isEditMode) {
            console.log('save device info');
            handleSubmit();
        }
        setisEditmode(!isEditMode);
    };

    const handleSubmit = e => {
        if (validateForm(errors)) {
            if (softwareVersion == '' || trackerNumber < 9999) {
                console.log('Required all Feilds');
            } else {
                const body = {
                    softwareVer: softwareVersion,
                    deviceID: ""+trackerNumber,
                    isDumy: true,
                };
                const api = ApiManager.getInstance();
                api.send('POST', APIURLS.editDevice, body)
                    .then(res => {
                        console.log(res);
                        if (res.data.code === 1014) {
                            props.history.goBack();
                        } else {
                            console.log('Bad Body ADD DEVICE');
                        }
                    })
                    .catch(error => {
                        console.log('Error', error);
                    });
            }
        }
    };
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let error = errors;
        const validVersionRegex = RegExp(/^\d{1,2}\.\d{1,2}\.\d{1,2}$/);
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

    useEffect(() => {
        console.log('Detail useEffect Device : ', props.location.state);
        const { device } = props.location.state;
        if (device) {
            setTrackerNumber(device.deviceID);
            setSoftwareVersion(device.softwareVer);
        } else {
            props.history.goBack();
        }
    }, []);

    return (
        <Grid>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.addDevice })}
                </title>
            </Helmet>
            <Header
                title={<FormattedMessage {...messages.addDevice} />}
                showEditBtn
                onEdit={handleEditMode}
                isEditMode={isEditMode}
            />
            <Grid>
                <Grid item sm={12} md={8} className={classes.root}>
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
                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage
                                    {...messages.softwareVersion}
                                />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={softwareVersion}
                                name="softwareVersion"
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterSoftware,
                                })}
                                onChange={handleChange}
                                disabled={!isEditMode}
                                disableUnderline
                            />
                            {errors.softwareVersion.length > 0 && (
                                <span className={classes.error}>
                                    {errors.softwareVersion}
                                </span>
                            )}
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.trackerNumber} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={trackerNumber}
                                name="trackerNumber"
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterTraker,
                                })}
                                type="number"
                                disabled={true}
                                onChange={handleChange}
                                disableUnderline
                            />
                            {errors.trackerNumber.length > 0 && (
                                <span className={classes.error}>
                                    {errors.trackerNumber}
                                </span>
                            )}
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
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

DeviceDetailPage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(DeviceDetailPage));
