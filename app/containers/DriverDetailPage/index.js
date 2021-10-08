/**
 *
 * DriverDetailPage
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
import makeSelectDriverDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import {
    Button,
    Grid,
    Input,
    Radio,
    RadioGroup,
    Typography,
} from '@material-ui/core';
import UserAvatar from '../../components/UserAvatar';
import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export function DriverDetailPage(props) {
    useInjectReducer({ key: 'driverDetailPage', reducer });
    useInjectSaga({ key: 'driverDetailPage', saga });

    const classes = useStyles(props);
    const [isEditMode, setisEditmode] = useState(false);
    const [email, setEmail] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [idNum, setIdNum] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [licenseNum, setLicenseNum] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const handleEditMode = () => {
        if (isEditMode) {
            console.log('save genset info');
        }
        setisEditmode(!isEditMode);
    };

    const handleChange = e => {
        e.preventDefault();

        const { name, value } = e.target;

        switch (name) {
            case 'email':
                setEmail(value);
                break;

            case 'ownerEmail':
                setOwnerEmail(value);
                break;

            case 'name':
                setName(value);
                break;

            case 'phoneNum':
                setPhoneNum(value);
                break;

            case 'idNum':
                setIdNum(value);
                break;

            case 'age':
                setAge(value);
                break;

            case 'gender':
                setGender(value);
                break;

            case 'licenseNum':
                setLicenseNum(value);
                break;

            case 'expiryDate':
                setExpiryDate(value);
                break;
        }
    };

    const handleGender = gender => {
        return gender === 1 ? 'Male' : 'Female';
    };

    useEffect(() => {
        console.log(props.location.state);
        if (props.location.state.driver) {
            const driver = props.location.state.driver;
            setAge(driver.driverAge);
            setExpiryDate(driver.licenceExpiry);
            setIdNum(driver.driverID);
            setLicenseNum(driver.licenceNumber);
            setGender(handleGender(driver.gender));
            setName(driver.driverName);
            setOwnerEmail(driver.driverOwner);
            setEmail(driver.driverEmail);
            setPhoneNum(driver.driverPhone);
        } else {
            props.history.goBack();
        }
    }, []);

    return (
        <div>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.driverInfo })}
                </title>
            </Helmet>
            <Header
                title={<FormattedMessage {...messages.driverInfo} />}
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
                            alt="Profile Avatar"
                            src={defaultProfileImage}
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
                                <FormattedMessage {...messages.driverEmail} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={email}
                                name="email"
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterDriverEmail,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.ownerEmail} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={ownerEmail}
                                name="ownerEmail"
                                type="ownerEmail"
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterOwnerEmail,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                        </Grid>

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
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterName,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.idNum} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={idNum}
                                name="idNum"
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterIdNum,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
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
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterPhoneNum,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
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
                                name="age"
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterAge,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.gender} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={gender}
                                name="gender"
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterGender,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
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
                                <FormattedMessage {...messages.licenseNum} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={licenseNum}
                                name="licenseNum"
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterLicenseNum,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.expiryDate} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={expiryDate}
                                name="expiryDate"
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterExpiryDate,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

DriverDetailPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    driverDetailPage: makeSelectDriverDetailPage(),
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

export default compose(withConnect)(injectIntl(DriverDetailPage));
