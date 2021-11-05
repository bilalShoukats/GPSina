/**
 *
 * AddDriverPage
 *
 */

import 'date-fns';
import * as Yup from 'yup';
import moment from 'moment';
import { compose } from 'redux';
import messages from './messages';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { useStyles } from './styles.js';
import DateFnsUtils from '@date-io/date-fns';
import Header from '../../components/Header';
import APIURLS from '../../ApiManager/apiUrl';
import ApiManager from '../../ApiManager/ApiManager';
import UserAvatar from '../../components/UserAvatar';
import { Formik, Field, ErrorMessage } from 'formik';
import { GENDER, LICENSE } from '../../constants/driver';
import { FormattedMessage, injectIntl } from 'react-intl';
import driverIcon from '../../../assets/images/icons/driver.svg';
import { Button, Grid, Input, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

export function AddDriverPage(props) {
    const classes = useStyles(props);
    const [clickBtn, setClickBtn] = useState(false);

    const addDriver = body => {
        console.log('Submitted Body: ', body);
        const api = ApiManager.getInstance();
        setClickBtn(true);
        api.send('POST', APIURLS.addDriver, body)
            .then(res => {
                setClickBtn(false);
                console.log('Response', res);
                if (res.data.code === 1008) {
                    props.history.goBack();
                }
            })
            .catch(error => {
                setClickBtn(false);
                console.log('Error', error);
            });
    };
    const initialValues = {
        email: '',
        name: '',
        phoneNum: '',
        age: '',
        gender: '',
        licenceType: '',
        licenseNum: '',
        expiryDate: null,
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .min(8, 'Must be 8 characters or more')
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
        name: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        phoneNum: Yup.string()
            .matches(/^\d+$/, 'The field should have digits only')
            .min(9, 'Must be 9 characters or more')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        age: Yup.number()
            .min(18, 'Must be 18 years old or more')
            .max(80, 'Must be 80 years old or less')
            .required('Required'),
        gender: Yup.number()
            .min(0, 'Please Select the Gender')
            .required('Required'),
        licenceType: Yup.number()
            .min(0, 'Please Select the Gender')
            .required('Required'),
        licenseNum: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        expiryDate: Yup.date()
            .nullable('Empty')
            .required('Required'),
    });

    return (
        <Grid>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.addDriver })}
                </title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.addDriver} />} />

            <Grid>
                <Grid item sm={12} md={8} className={classes.root}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            let body = {
                                driverAge: parseInt(values.age),
                                driverEmail: values.email,
                                driverName: values.name,
                                driverPhone: values.phoneNum.toString(),
                                gender: parseInt(values.gender),
                                licenceNumber: values.licenseNum,
                                licenceExpiry: moment(
                                    values.expiryDate,
                                    'MM/DD/YYYY',
                                ).unix(),
                                licenceType: parseInt(values.licenceType),
                            };
                            addDriver(body);
                        }}
                    >
                        {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                <Grid
                                    container
                                    justify="center"
                                    alignItems="center"
                                    className={classes.avatar}
                                >
                                    <UserAvatar
                                        alt="Profile Avatar"
                                        src={driverIcon}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                        }}
                                    />
                                </Grid>

                                <Grid className={classes.container}>
                                    <Typography
                                        variant="h5"
                                        className={classes.title}
                                    >
                                        <FormattedMessage
                                            {...messages.driverInformation}
                                        />
                                    </Typography>
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

                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            className={classes.label}
                                        >
                                            <FormattedMessage
                                                {...messages.username}
                                            />
                                        </Typography>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterUsername,
                                                },
                                            )}
                                            {...formik.getFieldProps('name')}
                                        />
                                        <ErrorMessage
                                            name="name"
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
                                                {...messages.age}
                                            />
                                        </Typography>
                                        <Input
                                            type="number"
                                            id="age"
                                            name="age"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterAge,
                                                },
                                            )}
                                            {...formik.getFieldProps('age')}
                                        />
                                        <ErrorMessage
                                            name="age"
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
                                                {...messages.gender}
                                            />
                                        </Typography>
                                        <Field
                                            name="gender"
                                            type="number"
                                            as="select"
                                            className={classes.dropMenu}
                                            {...formik.getFieldProps('gender')}
                                        >
                                            <option value="" disabled>
                                                Select Gender
                                            </option>
                                            <option value={GENDER[0].value}>
                                                {GENDER[0].label}
                                            </option>
                                            <option value={GENDER[1].value}>
                                                {GENDER[1].label}
                                            </option>
                                        </Field>
                                        <ErrorMessage
                                            name="gender"
                                            render={msg => (
                                                <Grid className={classes.error}>
                                                    {msg}
                                                </Grid>
                                            )}
                                        />
                                    </Grid>

                                    <Typography
                                        variant="h5"
                                        className={classes.title}
                                    >
                                        <FormattedMessage
                                            {...messages.licenseInformation}
                                        />
                                    </Typography>

                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            className={classes.label}
                                        >
                                            <FormattedMessage
                                                {...messages.licenseType}
                                            />
                                        </Typography>
                                        <Field
                                            name="licenceType"
                                            as="select"
                                            type="number"
                                            className={classes.dropMenu}
                                            {...formik.getFieldProps(
                                                'licenceType',
                                            )}
                                        >
                                            <option value="" disabled>
                                                Select License Type
                                            </option>
                                            <option value={LICENSE[0].value}>
                                                {LICENSE[0].label}
                                            </option>
                                            <option value={LICENSE[1].value}>
                                                {LICENSE[1].label}
                                            </option>
                                        </Field>
                                        <ErrorMessage
                                            name="licenceType"
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
                                                {...messages.licenseNum}
                                            />
                                        </Typography>
                                        <Input
                                            id="licenseNum"
                                            className={classes.textInput}
                                            name="licenseNum"
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterLicenseNum,
                                                },
                                            )}
                                            disableUnderline
                                            {...formik.getFieldProps(
                                                'licenseNum',
                                            )}
                                        />
                                        <ErrorMessage
                                            name="licenseNum"
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
                                                {...messages.expiryDate}
                                            />
                                        </Typography>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <DatePicker
                                                name="expiryDate"
                                                autoOk
                                                variant="inline"
                                                className={classes.textInput}
                                                placeholder={props.intl.formatMessage(
                                                    {
                                                        ...messages.enterExpiryDate,
                                                    },
                                                )}
                                                inputProps={{
                                                    style: { color: 'white' },
                                                }}
                                                id="expiryDate"
                                                // inputVariant="outlined"
                                                format="MM/dd/yyyy"
                                                value={formik.values.expiryDate}
                                                onChange={value =>
                                                    formik.setFieldValue(
                                                        'expiryDate',
                                                        value,
                                                    )
                                                }
                                            />
                                        </MuiPickersUtilsProvider>
                                        <ErrorMessage
                                            name="expiryDate"
                                            render={msg => (
                                                <Grid className={classes.error}>
                                                    {msg}
                                                </Grid>
                                            )}
                                        />
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
        </Grid>
    );
}

AddDriverPage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(AddDriverPage));
