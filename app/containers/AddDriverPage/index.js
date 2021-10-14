/**
 *
 * AddDriverPage
 *
 */

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
import { GENDER, LICENSE } from '../../constants/driver';
import { useStyles } from './styles.js';
import {
    Button,
    Grid,
    Input,
    Typography,
    Select,
    FormControl,
    MenuItem,
} from '@material-ui/core';
import moment from 'moment';
import UserAvatar from '../../components/UserAvatar';
import driverIcon from '../../../assets/images/icons/driver.svg';

export function AddDriverPage(props) {
    const classes = useStyles(props);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [licenseType, setLicensetype] = useState('');
    const [licenseNum, setLicenseNum] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [clickBtn, setClickBtn] = useState(false);

    const [errors, setErrors] = useState({
        email: '',
        name: '',
        age: '',
        phoneNum: '',
        gender: '',
        licenseNum: '',
        licenseType: '',
        expiryDate: '',
    });

    const convertIntoUnix = date => {
        var unixTimestamp = moment(date, 'MM/DD/YYYY').unix();
        return unixTimestamp;
        // console.log('Date: ', date, 'Unix: ', unixTimestamp);
    };

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let error = errors;

        switch (name) {
            case 'email':
                error.email =
                    value.length < 8 || value.length > 50
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setEmail(value);
                break;

            case 'name':
                error.name =
                    value.length < 3 || value.length > 20
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setName(value);
                break;

            case 'phoneNum':
                error.phoneNum =
                    value.length < 9 || value.length > 20
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setPhoneNum(value);
                break;

            case 'age':
                error.age =
                    value < 18 || value > 80
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setAge(value);
                break;

            case 'gender':
                error.gender =
                    value < 0
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setGender(value);
                break;

            case 'licenseType':
                error.licenseType =
                    value < 0
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setLicensetype(value);
                break;

            case 'licenseNum':
                error.licenseNum =
                    value.length < 3 || value.length > 20
                        ? props.intl.formatMessage({
                              ...messages.invalidRange,
                          })
                        : '';
                setLicenseNum(value);
                break;

            case 'expiryDate':
                setExpiryDate(value);
                break;
        }
        setErrors(error);
    };
    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    };

    const handleExpiryDateChange = date => {
        setExpiryDate(date);
    };

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

    const handleSubmit = e => {
        e.preventDefault();
        let body = {
            // driverID: 'x124b29g980',
            driverAge: parseInt(age),
            driverEmail: email,
            driverName: name,
            driverPhone: phoneNum,
            gender: gender,
            licenceNumber: licenseNum,
            licenceExpiry: convertIntoUnix(expiryDate),
            licenceType: licenseType,
            // companyEmail: 'azure@innovations.com',
            // registrationNo: '',
        };
        if (validateForm(errors)) {
            if (
                email === '' ||
                name === '' ||
                age == '' ||
                phoneNum === '' ||
                licenseNum === '' ||
                expiryDate == '' ||
                gender === '' ||
                licenseType === ''
            ) {
                if (email == '') console.log('Required email');
                else if (name == '') console.log('Required name');
                else if (age == '') console.log('Required age');
                else if (phoneNum == '') console.log('Required phone number');
                else if (licenseNum == '')
                    console.log('Required license number');
                else if (expiryDate == '') console.log('Required expiry date');
                else if (gender === '') console.log('Required gender');
                else if (licenseType === '')
                    console.log('Required license type');
            } else {
                addDriver(body);
            }
        }
        // console.log('handleSubmitAddGenset');
        // props.history.goBack();
    };

    useEffect(() => {}, []);

    return (
        <div>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.addDriver })}
                </title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.addDriver} />} />

            <div>
                <Grid item sm={12} md={8} className={classes.root}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.avatar}
                    >
                        <UserAvatar
                            alt="Profile Avatar"
                            src={driverIcon}
                            style={{ width: '100px', height: '100px' }}
                        />
                    </Grid>

                    <div className={classes.container}>
                        <Typography variant="h5" className={classes.title}>
                            <FormattedMessage {...messages.driverInformation} />
                        </Typography>
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

                        {/* <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.username} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={username}
                                name="username"
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterUsername,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                            {errors.username.length > 0 && (
                                <span className={classes.error}>
                                    {errors.username}
                                </span>
                            )}
                        </Grid> */}

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.name} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={name}
                                name="name"
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterName,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                            {errors.name.length > 0 && (
                                <span className={classes.error}>
                                    {errors.name}
                                </span>
                            )}
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.age} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={age}
                                type="number"
                                name="age"
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterAge,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                            {errors.age.length > 0 && (
                                <span className={classes.error}>
                                    {errors.age}
                                </span>
                            )}
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.phoneNum} />
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
                                <FormattedMessage {...messages.gender} />
                            </Typography>
                            <FormControl className={classes.dropMenu}>
                                <Select
                                    name="gender"
                                    value={gender}
                                    onChange={handleChange}
                                    displayEmpty
                                    className={classes.select}
                                >
                                    <MenuItem value="" disabled>
                                        <FormattedMessage
                                            {...messages.enterGender}
                                        />
                                    </MenuItem>
                                    <MenuItem value={GENDER[0].value}>
                                        {GENDER[0].label}
                                    </MenuItem>
                                    <MenuItem value={GENDER[1].value}>
                                        {GENDER[1].label}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Typography variant="h5" className={classes.title}>
                            <FormattedMessage
                                {...messages.licenseInformation}
                            />
                        </Typography>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.licenseType} />
                            </Typography>
                            <FormControl className={classes.dropMenu}>
                                <Select
                                    name="licenseType"
                                    value={licenseType}
                                    onChange={handleChange}
                                    displayEmpty
                                    className={classes.select}
                                >
                                    <MenuItem value="" disabled>
                                        <FormattedMessage
                                            {...messages.enterLicenseType}
                                        />
                                    </MenuItem>
                                    <MenuItem value={LICENSE[0].value}>
                                        {LICENSE[0].label}
                                    </MenuItem>
                                    <MenuItem value={LICENSE[1].value}>
                                        {LICENSE[1].label}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.licenseNum} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={licenseNum}
                                name="licenseNum"
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterLicenseNum,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                            {errors.licenseNum.length > 0 && (
                                <span className={classes.error}>
                                    {errors.licenseNum}
                                </span>
                            )}
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
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
                    </div>

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
            </div>
        </div>
    );
}

AddDriverPage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(AddDriverPage));
