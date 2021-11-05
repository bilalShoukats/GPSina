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
import { FormattedMessage, injectIntl } from 'react-intl';
import vehicleIcon from '../../../assets/images/icons/vehicle.svg';
import { COMMERCIAL, FUEL, PRIVATE, TYPE } from '../../constants/vehicle';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import {
    Button,
    Grid,
    Input,
    Radio,
    Typography,
    RadioGroup,
    FormControlLabel,
} from '@material-ui/core';

export function AddVehiclePage(props) {
    const classes = useStyles(props);
    const [type, setType] = useState(TYPE[0]);

    const [clickBtn, setClickBtn] = useState(false);

    const initialValues = {
        registrationNo: '',
        make: null,
        vehicleModel: '',
        engineNo: '',
        chassis: '',
        mileage: '',
        color: '',
        vehicleType: '',
        fuelType: '',
        fuelTankCapacityInLiters: '',
        loadingWeightCapacity: '',
        company: '',
        insuranceNumber: '',
        insuranceType: '',
        expiredAt: null,
        reading: '',
        interval: '',
        next: '',
        width: '',
        height: '',
        length: '',
    };

    const validationSchema = Yup.object({
        registrationNo: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        make: Yup.date()
            .nullable('Empty')
            .required('Required'),
        vehicleModel: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
        engineNo: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        chassis: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
        mileage: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(10, 'Must be 10 characters or less')
            .required('Required'),
        color: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
        vehicleType: Yup.number()
            .min(0, 'Please Select the vehicle type')
            .required('Required'),
        fuelType: Yup.number()
            .min(0, 'Please Select the fuel type')
            .required('Required'),
        fuelTankCapacityInLiters: Yup.number()
            .min(0, 'Must be 0 or more')
            .required('Required'),
        loadingWeightCapacity: Yup.number().min(0, 'Must be 0 or more'),
        company: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(30, 'Must be 30 characters or less'),
        insuranceNumber: Yup.string()
            .matches(/^\d+$/, 'The field should have digits only')
            .min(9, 'Must be 9 characters or more')
            .max(20, 'Must be 20 characters or less'),
        insuranceType: Yup.string()
            .matches(/^\d+$/, 'The field should have digits only')
            .min(1, 'Must be 1 characters')
            .max(1, 'Must be 1 characters'),
        expiredAt: Yup.date().nullable('Empty'),
        reading: Yup.number().min(0, 'Must be 0 or more'),
        interval: Yup.number().min(0, 'Must be 0 or more'),
        next: Yup.number().min(0, 'Must be 0 or more'),
        width: Yup.number().min(0, 'Must be 0 or more'),
        height: Yup.number().min(0, 'Must be 0 or more'),
        length: Yup.number().min(0, 'Must be 0 or more'),
    });

    const addVehicle = body => {
        console.log('Body for addVehicle: ', body);
        const api = ApiManager.getInstance();
        setClickBtn(true);
        api.send('POST', APIURLS.addVehicle, body)
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

    return (
        <Grid>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.addVehicle })}
                </title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.addVehicle} />} />

            <Grid item sm={12} md={8} className={classes.root}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    className={classes.avatar}
                >
                    <UserAvatar
                        alt="Vehicle Avatar"
                        src={vehicleIcon}
                        style={{ width: '100px', height: '100px' }}
                    />
                </Grid>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        const body = {
                            vehicleModel: values.vehicleModel,
                            // // vehicleID: "1k3hd39293nc3993993",
                            color: values.color,
                            vehicleType: parseInt(values.vehicleType),
                            fuelType: parseInt(values.fuelType),
                            mileage: values.mileage,
                            engineNo: values.engineNo,
                            registrationNo: values.registrationNo,
                            chassis: values.chassis,
                            isDumy: true,
                            type: type.value,
                            fuelTankCapacityInLiters: parseInt(
                                values.fuelTankCapacityInLiters,
                            ),
                            make: values.make
                                ? new Intl.DateTimeFormat('ko-KR')
                                      .format(values.make)
                                      .replaceAll('. ', '/')
                                      .replace('.', '')
                                : null,
                            insurance: {
                                companyName: values.company,
                                type: values.insuranceType,
                                expiredAt: moment(
                                    values.expiredAt,
                                    'MM/DD/YYYY',
                                ).unix(),
                                number: values.insuranceNumber,
                            },
                            loadingWeightCapacity: parseFloat(
                                values.loadingWeightCapacity,
                            ),
                            loadingAreaDimension: {
                                width: parseFloat(values.width),
                                height: parseFloat(values.height),
                                length: parseFloat(values.length),
                            },
                            maintainanceInfo: {
                                reading: parseFloat(values.reading),
                                interval: parseFloat(values.interval),
                                next: parseInt(values.next),
                            },
                            type: type.value,
                        };
                        addVehicle(body);
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
                                    <FormattedMessage
                                        {...messages.registrationNo}
                                    />
                                </Typography>
                                <Input
                                    type="text"
                                    id="registrationNo"
                                    name="registrationNo"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterRegistrationNo,
                                    })}
                                    {...formik.getFieldProps('registrationNo')}
                                />
                                <ErrorMessage
                                    name="registrationNo"
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
                                    <FormattedMessage {...messages.make} />
                                </Typography>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        name="make"
                                        autoOk
                                        variant="inline"
                                        className={classes.textInput}
                                        placeholder={props.intl.formatMessage({
                                            ...messages.enterMake,
                                        })}
                                        inputProps={{
                                            style: { color: 'white' },
                                        }}
                                        id="make"
                                        // inputVariant="outlined"
                                        format="MM/dd/yyyy"
                                        value={formik.values.make}
                                        onChange={value =>
                                            formik.setFieldValue('make', value)
                                        }
                                    />
                                </MuiPickersUtilsProvider>
                                <ErrorMessage
                                    name="make"
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
                                        {...messages.vehicleModel}
                                    />
                                </Typography>
                                <Input
                                    type="text"
                                    id="vehicleModel"
                                    name="vehicleModel"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterVehicleModel,
                                    })}
                                    {...formik.getFieldProps('vehicleModel')}
                                />
                                <ErrorMessage
                                    name="vehicleModel"
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
                                    <FormattedMessage {...messages.engineNo} />
                                </Typography>
                                <Input
                                    type="text"
                                    id="engineNo"
                                    name="engineNo"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterEngineNo,
                                    })}
                                    {...formik.getFieldProps('engineNo')}
                                />
                                <ErrorMessage
                                    name="engineNo"
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
                                    <FormattedMessage {...messages.chassis} />
                                </Typography>
                                <Input
                                    type="text"
                                    id="chassis"
                                    name="chassis"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterChassis,
                                    })}
                                    {...formik.getFieldProps('chassis')}
                                />
                                <ErrorMessage
                                    name="chassis"
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
                                    <FormattedMessage {...messages.mileage} />
                                </Typography>
                                <Input
                                    type="text"
                                    id="mileage"
                                    name="mileage"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterMileage,
                                    })}
                                    {...formik.getFieldProps('mileage')}
                                />
                                <ErrorMessage
                                    name="mileage"
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
                                <Input
                                    type="text"
                                    id="color"
                                    name="color"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterColor,
                                    })}
                                    {...formik.getFieldProps('color')}
                                />
                                <ErrorMessage
                                    name="color"
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
                                        {...messages.vehicleType}
                                    />
                                </Typography>
                                <Field
                                    name="vehicleType"
                                    type="number"
                                    as="select"
                                    className={classes.dropMenu}
                                    {...formik.getFieldProps('vehicleType')}
                                >
                                    <option value="" disabled>
                                        Select Vehicle Type
                                    </option>
                                    <option
                                        value={
                                            type.value === TYPE[0].value
                                                ? PRIVATE[0].value
                                                : COMMERCIAL[0].value
                                        }
                                    >
                                        {type.value === TYPE[0].value
                                            ? PRIVATE[0].label
                                            : COMMERCIAL[0].label}
                                    </option>
                                    <option
                                        value={
                                            type.value === TYPE[1].value
                                                ? PRIVATE[1].value
                                                : COMMERCIAL[1].value
                                        }
                                    >
                                        {type.value === TYPE[1].value
                                            ? PRIVATE[1].label
                                            : COMMERCIAL[1].label}
                                    </option>
                                </Field>
                                <ErrorMessage
                                    name="vehicleType"
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
                                    <FormattedMessage {...messages.fuelType} />
                                </Typography>
                                <Field
                                    name="fuelType"
                                    type="number"
                                    as="select"
                                    className={classes.dropMenu}
                                    {...formik.getFieldProps('fuelType')}
                                >
                                    <option value="" disabled>
                                        Select Fuel Type
                                    </option>
                                    <option value={FUEL[0].value}>
                                        {FUEL[0].label}
                                    </option>
                                    <option value={FUEL[1].value}>
                                        {FUEL[1].label}
                                    </option>
                                </Field>
                                <ErrorMessage
                                    name="vehicleType"
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
                                        {...messages.fuelTankCapacityInLiters}
                                    />
                                </Typography>
                                <Input
                                    type="number"
                                    id="fuelTankCapacityInLiters"
                                    name="fuelTankCapacityInLiters"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterFuelTankCapacityInLiters,
                                    })}
                                    {...formik.getFieldProps(
                                        'fuelTankCapacityInLiters',
                                    )}
                                />
                                <ErrorMessage
                                    name="fuelTankCapacityInLiters"
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
                                                {...messages.loadingWeightCapacity}
                                            />
                                        </Typography>
                                        <Input
                                            type="number"
                                            id="loadingWeightCapacity"
                                            name="loadingWeightCapacity"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterLoadingWeightCapacity,
                                                },
                                            )}
                                            {...formik.getFieldProps(
                                                'loadingWeightCapacity',
                                            )}
                                        />
                                        <ErrorMessage
                                            name="loadingWeightCapacity"
                                            render={msg => (
                                                <Grid className={classes.error}>
                                                    {msg}
                                                </Grid>
                                            )}
                                        />
                                    </Grid>

                                    <Grid className={classes.container}>
                                        <Typography
                                            variant="h5"
                                            className={classes.title}
                                        >
                                            <FormattedMessage
                                                {...messages.loadingAreaInformation}
                                            />
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            className={classes.label}
                                        >
                                            <FormattedMessage
                                                {...messages.width}
                                            />
                                        </Typography>
                                        <Input
                                            type="number"
                                            id="width"
                                            name="width"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterWidth,
                                                },
                                            )}
                                            {...formik.getFieldProps('width')}
                                        />
                                        <ErrorMessage
                                            name="width"
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
                                                {...messages.height}
                                            />
                                        </Typography>
                                        <Input
                                            type="number"
                                            id="height"
                                            name="height"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterHeight,
                                                },
                                            )}
                                            {...formik.getFieldProps('height')}
                                        />
                                        <ErrorMessage
                                            name="height"
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
                                                {...messages.length}
                                            />
                                        </Typography>
                                        <Input
                                            type="number"
                                            id="length"
                                            name="length"
                                            className={classes.textInput}
                                            placeholder={props.intl.formatMessage(
                                                {
                                                    ...messages.enterLength,
                                                },
                                            )}
                                            {...formik.getFieldProps('length')}
                                        />
                                        <ErrorMessage
                                            name="length"
                                            render={msg => (
                                                <Grid className={classes.error}>
                                                    {msg}
                                                </Grid>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            )}

                            <Grid className={classes.container}>
                                <Typography
                                    variant="h5"
                                    className={classes.title}
                                >
                                    <FormattedMessage
                                        {...messages.insuranceInformation}
                                    />
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage {...messages.company} />
                                </Typography>
                                <Input
                                    type="text"
                                    id="company"
                                    name="company"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterCompany,
                                    })}
                                    {...formik.getFieldProps('company')}
                                />
                                <ErrorMessage
                                    name="company"
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
                                        {...messages.insuranceNumber}
                                    />
                                </Typography>
                                <Input
                                    type="text"
                                    id="number"
                                    name="number"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterNumber,
                                    })}
                                    {...formik.getFieldProps('number')}
                                />
                                <ErrorMessage
                                    name="number"
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
                                        {...messages.insuranceType}
                                    />
                                </Typography>
                                <Input
                                    type="text"
                                    id="insuranceType"
                                    name="insuranceType"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterType,
                                    })}
                                    {...formik.getFieldProps('insuranceType')}
                                />
                                <ErrorMessage
                                    name="insuranceType"
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
                                    <FormattedMessage {...messages.expiredAt} />
                                </Typography>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        name="expiredAt"
                                        autoOk
                                        variant="inline"
                                        className={classes.textInput}
                                        placeholder={props.intl.formatMessage({
                                            ...messages.enterExpiredAt,
                                        })}
                                        inputProps={{
                                            style: { color: 'white' },
                                        }}
                                        id="expiredAt"
                                        // inputVariant="outlined"
                                        format="MM/dd/yyyy"
                                        value={formik.values.expiredAt}
                                        onChange={value =>
                                            formik.setFieldValue(
                                                'expiredAt',
                                                value,
                                            )
                                        }
                                    />
                                </MuiPickersUtilsProvider>
                                <ErrorMessage
                                    name="expiredAt"
                                    render={msg => (
                                        <Grid className={classes.error}>
                                            {msg}
                                        </Grid>
                                    )}
                                />
                            </Grid>

                            <Grid className={classes.container}>
                                <Typography
                                    variant="h5"
                                    className={classes.title}
                                >
                                    <FormattedMessage
                                        {...messages.maintainceInformation}
                                    />
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage {...messages.reading} />
                                </Typography>
                                <Input
                                    type="number"
                                    id="reading"
                                    name="reading"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterReading,
                                    })}
                                    {...formik.getFieldProps('reading')}
                                />
                                <ErrorMessage
                                    name="reading"
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
                                    <FormattedMessage {...messages.interval} />
                                </Typography>
                                <Input
                                    type="number"
                                    id="interval"
                                    name="interval"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterInterval,
                                    })}
                                    {...formik.getFieldProps('interval')}
                                />
                                <ErrorMessage
                                    name="interval"
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
                                    <FormattedMessage {...messages.next} />
                                </Typography>
                                <Input
                                    type="number"
                                    id="next"
                                    name="next"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterNext,
                                    })}
                                    {...formik.getFieldProps('next')}
                                />
                                <ErrorMessage
                                    name="next"
                                    render={msg => (
                                        <Grid className={classes.error}>
                                            {msg}
                                        </Grid>
                                    )}
                                />
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
AddVehiclePage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(AddVehiclePage));
