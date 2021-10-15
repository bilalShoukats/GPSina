import React, { useEffect, useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import messages from './messages';
import Header from '../../components/Header';
import ApiManager from '../../ApiManager/ApiManager';
import APIURLS from '../../ApiManager/apiUrl';
import { PRIVATE, FUEL, COMMERCIAL } from '../../constants/vehicle';
import { useStyles } from './styles.js';
import moment from 'moment';
import {
    Button,
    Grid,
    Input,
    Typography,
    Radio,
    RadioGroup,
    FormControl,
    Select,
    MenuItem,
} from '@material-ui/core';

import UserAvatar from '../../components/UserAvatar';
import vehicleIcon from '../../../assets/images/icons/vehicle.svg';

export function AddVehiclePage(props) {
    const classes = useStyles(props);
    const [type, setType] = useState(0);
    const [registraionNumber, setRegistraionNumber] = useState('');
    const [make, setMake] = useState(new Date());
    const [model, setModel] = useState('');
    const [engineNo, setEngineNo] = useState('');
    const [chassis, setChassis] = useState('');
    const [mileage, setMileage] = useState('');
    const [color, setColor] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [fuelTankCapacity, setFuelTankCapacity] = useState('');
    const [loadingWeight, setLoadingWeight] = useState('');
    const [company, setCompany] = useState('');
    const [insuranceNumber, setInsuranceNumber] = useState('');
    const [insuranceType, setInsuranceType] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [reading, setReading] = useState('');
    const [interval, setInterval] = useState('');
    const [next, setNext] = useState('');
    const [widthtFt, setWidthFt] = useState('');
    const [heightFt, setHeightFt] = useState('');
    const [lengthFt, setLengthFt] = useState('');
    const [clickBtn, setClickBtn] = useState(false);

    const [errors, setErrors] = useState({
        registraionNumber: '',
        make: '',
        model: '',
        engineNo: '',
        chassis: '',
        mileage: '',
        color: '',
        vehicleType: '',
        fuelType: '',
        fuelTankCapacity: '',
        loadingWeight: '',
        company: '',
        insuranceNumber: '',
        insuranceType: '',
        expiryDate: '',
        reading: '',
        interval: '',
        next: '',
        widthtFt: '',
        heightFt: '',
        lengthFt: '',
    });
    const convertIntoUnix = date => {
        var unixTimestamp = moment(date, 'MM/DD/YYYY').unix();
        return unixTimestamp;
        // console.log('Date: ', date, 'Unix: ', unixTimestamp);
    };

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

    const handleSubmit = e => {
        e.preventDefault();

        const body = {
            vehicleModel: model,
            // vehicleID: "1k3hd39293nc3993993",
            color: color,
            vehicleType: vehicleType,
            fuelType: fuelType,
            mileage: mileage,
            engineNo: engineNo,
            registrationNo: registraionNumber,
            chassis: chassis,
            isDumy: true,
            type: type,
            fuelTankCapacityInLiters: parseInt(fuelTankCapacity),
            make: make,
            insurance: {
                companyName: company,
                type: insuranceType,
                expiredAt: convertIntoUnix(expiryDate),
                number: insuranceNumber,
            },
            loadingWeightCapacity: parseFloat(loadingWeight),
            loadingAreaDimension: {
                width: parseFloat(widthtFt),
                height: parseFloat(heightFt),
                length: parseFloat(lengthFt),
            },
            maintainanceInfo: {
                reading: parseFloat(reading),
                interval: parseFloat(interval),
                next: parseInt(next),
            },
            type: type,
        };
        if (validateForm(errors)) {
            if (
                registraionNumber == '' ||
                model == '' ||
                engineNo == '' ||
                chassis == '' ||
                mileage == '' ||
                color == '' ||
                vehicleType === '' ||
                fuelType === '' ||
                fuelTankCapacity == '' ||
                company == '' ||
                insuranceNumber == '' ||
                insuranceType == '' ||
                reading == '' ||
                interval == '' ||
                next == ''
            ) {
                if (registraionNumber == '')
                    console.log('Required registraionNumber');
                else if (model == '') console.log('Required model');
                else if (engineNo == '') console.log('Required engineNo');
                else if (chassis == '') console.log('Required chassis');
                else if (mileage == '') console.log('Required mileage');
                else if (color == '') console.log('Required color');
                else if (vehicleType === '')
                    console.log('Required vehicleType');
                else if (fuelType === '') console.log('Required fuelType');
                else if (fuelTankCapacity == '')
                    console.log('Required fuelTankCapacity');
                else if (company == '') console.log('Required company');
                else if (insuranceNumber == '') console.log('Required ');
                else if (insuranceType == '')
                    console.log('Required insuranceNumber');
                else if (reading == '') console.log('Required reading');
                else if (interval == '') console.log('Required interval');
                else if (next == '') console.log('Required next');
            } else {
                if (type === 0) {
                    addVehicle(body);
                } else {
                    if (
                        widthtFt == '' ||
                        heightFt == '' ||
                        lengthFt == '' ||
                        loadingWeight == ''
                    ) {
                        console.log('Required all Feilds 2');
                    } else {
                        addVehicle(body);
                    }
                }
            }
        }
    };
    const formatter = new Intl.DateTimeFormat('ko-KR');

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    };
    const handleMakeDateChange = date => {
        setMake(
            formatter
                .format(date)
                .replaceAll('. ', '/')
                .replace('.', ''),
        );
    };
    const handleExpiryDateChange = date => {
        setExpiryDate(date);
    };

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let error = errors;
        switch (name) {
            case 'registraionNumber':
                error.registraionNumber =
                    value.length < 3 || value.length > 20
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setRegistraionNumber(value);
                break;

            case 'model':
                error.model =
                    value.length < 3 || value.length > 30
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setModel(value);
                break;
            case 'engineNo':
                error.engineNo =
                    value.length < 3 || value.length > 20
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setEngineNo(value);
                break;
            case 'chassis':
                error.chassis =
                    value.length < 3 || value.length > 30
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setChassis(value);
                break;
            case 'mileage':
                error.mileage =
                    value.length < 0 || value.length > 10
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setMileage(value);
                break;
            case 'color':
                error.color =
                    value.length < 3 || value.length > 30
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setColor(value);
                break;
            case 'vehicleType':
                error.vehicleType =
                    value < 0 || value > 6
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setVehicleType(value);
                // console.log('value : ', value, 'Vehicle Type : ', vehicleType);
                break;
            case 'fuelType':
                error.fuelType =
                    value < 0 || value > 10
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setFuelType(value);
                // console.log('value : ', value, 'Fuel Type :', fuelType);
                break;
            case 'loadingWeight':
                setLoadingWeight(value);
                break;
            case 'fuelTankCapacity':
                setFuelTankCapacity(value);
                break;
            case 'company':
                error.company =
                    value.length < 3 || value.length > 30
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setCompany(value);
                break;
            case 'insuranceNumber':
                error.insuranceNumber =
                    value.length < 3 || value.length > 30
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setInsuranceNumber(value);
                break;
            case 'insuranceType':
                error.insuranceType =
                    value < 0
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setInsuranceType(value);
                break;
            case 'reading':
                error.reading =
                    value < 0
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setReading(value);
                break;
            case 'interval':
                error.interval =
                    value < 0
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setInterval(value);
                break;
            case 'next':
                error.next =
                    value < 0
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setNext(value);
                break;
            case 'widthtFt':
                error.widthtFt =
                    value < 0
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setWidthFt(value);
                break;
            case 'heightFt':
                error.heightFt =
                    value < 0
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setHeightFt(value);
                break;
            case 'lengthFt':
                error.lengthFt =
                    value < 0
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setLengthFt(value);
                break;
        }
        setErrors(error);
    };

    useEffect(() => {
        handleMakeDateChange(make);
        handleExpiryDateChange(expiryDate);
    }, []);
    useEffect(() => {
        console.log('vehicleType: ', vehicleType);
    }, [vehicleType]);
    useEffect(() => {
        console.log('fuelType: ', fuelType);
    }, [fuelType]);
    return (
        <Grid>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.addVehicle })}
                </title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.addVehicle} />} />
            <Grid>
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
                    <Grid className={classes.container}>
                        <Typography variant="h5" className={classes.title}>
                            <FormattedMessage
                                {...messages.vehicleInformation}
                            />
                        </Typography>
                    </Grid>

                    <RadioGroup
                        className={classes.radioContainer}
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                    >
                        <Radio
                            checked={type === 0}
                            onChange={() => {
                                setType(0);
                                setVehicleType('');
                            }}
                            value={0}
                            style={{ color: '#28ACEA' }}
                        />
                        <Typography
                            variant="body1"
                            className={classes.radioGroup}
                        >
                            <FormattedMessage {...messages.private} />
                        </Typography>
                        <Radio
                            checked={type === 1}
                            onChange={() => {
                                setType(1);
                                setVehicleType('');
                            }}
                            value={1}
                            style={{ color: '#28ACEA' }}
                        />
                        <Typography
                            variant="body1"
                            className={classes.radioGroup}
                        >
                            <FormattedMessage {...messages.business} />
                        </Typography>
                    </RadioGroup>

                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.registraionNumber} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={registraionNumber}
                            name="registraionNumber"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterRegistraionNumber,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.registraionNumber.length > 0 && (
                            <span className={classes.error}>
                                {errors.registraionNumber}
                            </span>
                        )}
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.make} />
                        </Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                autoOk
                                variant="inline"
                                value={make}
                                onChange={handleMakeDateChange}
                                className={classes.textInput}
                                inputProps={{ style: { color: 'white' } }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.model} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={model}
                            name="model"
                            // type="text"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterModel,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.model.length > 0 && (
                            <span className={classes.error}>
                                {errors.model}
                            </span>
                        )}
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.engineNo} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={engineNo}
                            name="engineNo"
                            // type="text"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterEngineNo,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.engineNo.length > 0 && (
                            <span className={classes.error}>
                                {errors.engineNo}
                            </span>
                        )}
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.chassis} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={chassis}
                            name="chassis"
                            type="text"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterChassis,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.chassis.length > 0 && (
                            <span className={classes.error}>
                                {errors.chassis}
                            </span>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.mileage} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={mileage}
                            name="mileage"
                            type="text"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterMileage,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.mileage.length > 0 && (
                            <span className={classes.error}>
                                {errors.mileage}
                            </span>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.color} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={color}
                            name="color"
                            type="text"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterColor,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.color.length > 0 && (
                            <span className={classes.error}>
                                {errors.color}
                            </span>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.vehicleType} />
                        </Typography>
                        <FormControl className={classes.dropMenu}>
                            <Select
                                name="vehicleType"
                                value={vehicleType}
                                onChange={handleChange}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    <FormattedMessage
                                        {...messages.selectVehicle}
                                    />
                                </MenuItem>
                                <MenuItem
                                    value={
                                        type === 0
                                            ? PRIVATE[0].value
                                            : COMMERCIAL[0].value
                                    }
                                >
                                    {type === 0
                                        ? PRIVATE[0].label
                                        : COMMERCIAL[0].label}
                                </MenuItem>
                                <MenuItem
                                    value={
                                        type === 0
                                            ? PRIVATE[1].value
                                            : COMMERCIAL[1].value
                                    }
                                >
                                    {type === 0
                                        ? PRIVATE[1].label
                                        : COMMERCIAL[1].label}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.fuelType} />
                        </Typography>
                        <FormControl className={classes.dropMenu}>
                            <Select
                                name="fuelType"
                                value={fuelType}
                                // defaultValue={fuelType}
                                onChange={handleChange}
                                displayEmpty
                                className={classes.select}
                            >
                                <MenuItem value="" disabled>
                                    <FormattedMessage
                                        {...messages.selectFuel}
                                    />
                                </MenuItem>
                                <MenuItem value={FUEL[0].value}>
                                    {FUEL[0].label}
                                </MenuItem>
                                <MenuItem value={FUEL[1].value}>
                                    {FUEL[1].label}
                                </MenuItem>
                                <MenuItem value={FUEL[2].value}>
                                    {FUEL[2].label}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.fuelTankCapacity} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={fuelTankCapacity}
                            name="fuelTankCapacity"
                            type="number"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterFuelCapacity,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.fuelTankCapacity.length > 0 && (
                            <span className={classes.error}>
                                {errors.fuelTankCapacity}
                            </span>
                        )}
                    </Grid>
                    {type === 1 && (
                        <Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage
                                        {...messages.loadingWeight}
                                    />
                                </Typography>
                                <Input
                                    className={classes.textInput}
                                    value={loadingWeight}
                                    name="loadingWeight"
                                    type="number"
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterLoadingWeight,
                                    })}
                                    onChange={handleChange}
                                    disableUnderline
                                />
                                {errors.loadingWeight.length > 0 && (
                                    <span className={classes.error}>
                                        {errors.loadingWeight}
                                    </span>
                                )}
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
                                    <FormattedMessage {...messages.widthtFt} />
                                </Typography>
                                <Input
                                    className={classes.textInput}
                                    value={widthtFt}
                                    name="widthtFt"
                                    type="number"
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterWidth,
                                    })}
                                    onChange={handleChange}
                                    disableUnderline
                                />
                                {errors.widthtFt.length > 0 && (
                                    <span className={classes.error}>
                                        {errors.widthtFt}
                                    </span>
                                )}
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage {...messages.heightFt} />
                                </Typography>
                                <Input
                                    className={classes.textInput}
                                    value={heightFt}
                                    name="heightFt"
                                    type="number"
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterHeight,
                                    })}
                                    onChange={handleChange}
                                    disableUnderline
                                />
                                {errors.heightFt.length > 0 && (
                                    <span className={classes.error}>
                                        {errors.heightFt}
                                    </span>
                                )}
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage {...messages.lengthFt} />
                                </Typography>
                                <Input
                                    className={classes.textInput}
                                    value={lengthFt}
                                    name="lengthFt"
                                    type="number"
                                    placeholder={props.intl.formatMessage({
                                        ...messages.lengthFt,
                                    })}
                                    onChange={handleChange}
                                    disableUnderline
                                />
                                {errors.lengthFt.length > 0 && (
                                    <span className={classes.error}>
                                        {errors.lengthFt}
                                    </span>
                                )}
                            </Grid>
                        </Grid>
                    )}

                    <Grid className={classes.container}>
                        <Typography variant="h5" className={classes.title}>
                            <FormattedMessage
                                {...messages.insuranceInformation}
                            />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.company} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={company}
                            name="company"
                            type="text"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterCompany,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.company.length > 0 && (
                            <span className={classes.error}>
                                {errors.company}
                            </span>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.insuranceNumber} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={insuranceNumber}
                            name="insuranceNumber"
                            type="text"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterNumber,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.insuranceNumber.length > 0 && (
                            <span className={classes.error}>
                                {errors.insuranceNumber}
                            </span>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.insuranceType} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={insuranceType}
                            name="insuranceType"
                            type="number"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterType,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.insuranceType.length > 0 && (
                            <span className={classes.error}>
                                {errors.insuranceType}
                            </span>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.expiryDate} />
                        </Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                autoOk
                                variant="inline"
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                className={classes.textInput}
                                inputProps={{ style: { color: 'white' } }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid className={classes.container}>
                        <Typography variant="h5" className={classes.title}>
                            <FormattedMessage
                                {...messages.maintainceInformation}
                            />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.reading} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={reading}
                            name="reading"
                            type="number"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterReading,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.reading.length > 0 && (
                            <span className={classes.error}>
                                {errors.reading}
                            </span>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.interval} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={interval}
                            name="interval"
                            type="number"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterInterval,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.interval.length > 0 && (
                            <span className={classes.error}>
                                {errors.interval}
                            </span>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.label}>
                            <FormattedMessage {...messages.next} />
                        </Typography>
                        <Input
                            className={classes.textInput}
                            value={next}
                            name="next"
                            type="number"
                            placeholder={props.intl.formatMessage({
                                ...messages.enterNext,
                            })}
                            onChange={handleChange}
                            disableUnderline
                        />
                        {errors.next.length > 0 && (
                            <span className={classes.error}>{errors.next}</span>
                        )}
                    </Grid>
                </Grid>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    className={classes.btnContainer}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        size="medium"
                        disabled={clickBtn}
                        className={classes.btnBlue}
                        onClick={handleSubmit}
                    >
                        <Typography variant="body1">
                            <FormattedMessage {...messages.submit} />
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
AddVehiclePage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(AddVehiclePage));
