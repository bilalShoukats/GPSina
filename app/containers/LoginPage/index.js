/**
 *
 * LoginPage
 *
 */
import {
    selectLogin,
    makeSelectEmail,
    makeSelectPassword,
    makeSelectNewEmail,
    makeSelectAutoLogin,
    makeSelectRememberMe,
    makeSelectNewPassword,
    makeSelectNewConfirmPassword,
} from './selectors';
import { compose } from 'redux';
import reducer from './reducer';
import messages from './messages';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Img from '../../components/Img';
import { changeEmail } from './actions';
import { useStyles } from './styles.js';
import { Digital } from 'react-activity';
import 'react-activity/dist/Digital.css';
import SCREENS from '../../constants/screen';
import APIURLS from '../../ApiManager/apiUrl';
import { useHistory } from 'react-router-dom';
import CheckBox from '../../components/CheckBox';
import React, { useEffect, useState } from 'react';
import ApiManager from '../../ApiManager/ApiManager';
import { loginUser } from '../../redux/auth/actions';
import CustomModal from '../../components/CustomModal';
import UKFlag from '../../../assets/images/flags/uk.png';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useInjectReducer } from '../../utils/injectReducer';
import { Button, Input, Typography, Grid } from '@material-ui/core';
import { OtpDialogeBox } from '../../components/OtpDialougeBox';
import GPSinaLogoGrey from '../../../assets/images/logo/logo-small-gray.png';

export function LoginPage(props) {
    useInjectReducer({ key: 'login', reducer });

    const [errors, setErrors] = useState({
        newEmail: '',
        newPassword: '',
        newConfirmPassword: '',
        newUsername: '',
        newFirstname: '',
        newLastname: '',
        newMobileNo: '',
    });
    const [otpBody, setOtpBody] = useState({
        email: '',
        expireAt: 0,
        hash: '',
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [timeStamp, setTimeStamp] = useState(0);
    const [modalTitle, setModalTitle] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newLastname, setNewLastname] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newMobileNo, setNewMobileNo] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [newFirstname, setNewFirstname] = useState('');
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalDescription, setModalDescription] = useState('');
    const [isOtpModalShown, setIsOtpModalShown] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [newConfirmPassword, setNewConfirmPassword] = useState('');
    const classes = useStyles(props);
    const history = useHistory();

    const handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        let error = errors;
        const validEmailRegex = RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        );

        switch (name) {
            case 'email':
                setEmail(value);
                break;

            case 'password':
                setPassword(value);
                break;

            case 'newEmail':
                error.newEmail = validEmailRegex.test(value)
                    ? ''
                    : props.intl.formatMessage({ ...messages.notValidEmail });

                setNewEmail(value);
                break;

            case 'newPassword':
                error.newPassword =
                    value.length < 8
                        ? props.intl.formatMessage({
                              ...messages.atLeast8Character,
                          })
                        : '';
                error.newConfirmPassword = '';

                setNewPassword(value);
                break;

            case 'newConfirmPassword':
                error.newConfirmPassword =
                    value != newPassword && value.length > 0
                        ? props.intl.formatMessage({
                              ...messages.mismatchPassword,
                          })
                        : '';

                setNewConfirmPassword(value);
                break;

            case 'newFirstname':
                error.newFirstname =
                    value.length < 5
                        ? props.intl.formatMessage({
                              ...messages.atLeast5Character,
                          })
                        : '';

                setNewFirstname(value);
                break;

            case 'newLastname':
                error.newLastname =
                    value.length < 5
                        ? props.intl.formatMessage({
                              ...messages.atLeast5Character,
                          })
                        : '';

                setNewLastname(value);
                break;

            case 'newUsername':
                error.newUsername =
                    value.length < 5
                        ? props.intl.formatMessage({
                              ...messages.atLeast5Character,
                          })
                        : '';

                setNewUsername(value);
                break;

            case 'newMobileNo':
                error.newMobileNo =
                    value.length < 9
                        ? props.intl.formatMessage({
                              ...messages.invalidMobileNo,
                          })
                        : '';

                setNewMobileNo(value);
                break;
        }

        setErrors(error);
    };

    const handleRemeberMe = event => {
        setRememberMe(event.target.checked);
    };

    const handleAutoLogin = event => {
        setAutoLogin(event.target.checked);
    };

    useEffect(() => {
        if (loading) {
            setLoading(!props.error);
            setModalTitle(
                props.intl.formatMessage({
                    ...messages.validationError,
                }),
            );
            setModalDescription(
                props.intl.formatMessage({
                    ...messages.loginFailed,
                }),
            );
            handleOpenModal();
        }
    }, [props.error]);

    const registerUser = async body => {
        const api = ApiManager.getInstance();

        api.send('POST', APIURLS.register, body)
            .then(res => {
                console.log('Response Object : ', res);
                if (res) setRegisterLoading(false);
                if (res.data.code === 6011) {
                    setModalTitle(
                        props.intl.formatMessage({
                            ...messages.verifyOtp,
                        }),
                    );
                    setOtpBody({
                        email: res.data.response.email,
                        expireAt: res.data.response.expireAt,
                        hash: res.data.response.hash,
                    });
                    handleOtpOpenModal();
                } else {
                    setRegisterLoading(false);
                    console.log('Errors : ', error);
                    setModalTitle(
                        props.intl.formatMessage({
                            ...messages.registerFailed,
                        }),
                    );
                    setModalDescription(props.intl.formatMessage({}));
                    handleOpenModal();
                }
            })
            .catch(error => {
                setRegisterLoading(false);
                console.log('Errors : ', error);
                setModalTitle(
                    props.intl.formatMessage({
                        ...messages.registerFailed,
                    }),
                );
                setModalDescription(
                    props.intl.formatMessage({
                        ...messages.registerFailed,
                    }),
                );
                handleOpenModal();
            });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const { id } = event.target;

        switch (id) {
            case 'login':
                if (email == '' || password == '') {
                    setModalTitle(
                        props.intl.formatMessage({
                            ...messages.validationError,
                        }),
                    );
                    setModalDescription(
                        props.intl.formatMessage({
                            ...messages.pleaseCheckEmailAndPassword,
                        }),
                    );
                    handleOpenModal();
                } else {
                    let body = {
                        email: email,
                        password: password,
                        appVersion: '1.0.0.1',
                        //appVersion: props.apiManager.appVersion,
                    };
                    setLoading(true);
                    props.dispatch(loginUser(body, history));
                    // props.apiManager.callApi(
                    //     APIURLS.login,
                    //     'POST',
                    //     body,
                    //     res => {
                    //         console.log(res);
                    //         if (res.code === 2003) {
                    //             props.apiManager.saveToken(
                    //                 res.response.email,
                    //                 res.response.hash,
                    //             );
                    //             history.push(SCREENS.HOME);
                    //         }
                    //     },
                    // );
                }

                break;

            case 'signUp':
                if (validateForm(errors)) {
                    if (
                        newEmail == '' ||
                        newPassword == '' ||
                        newConfirmPassword == ''
                    ) {
                        setModalTitle(
                            props.intl.formatMessage({
                                ...messages.validationError,
                            }),
                        );
                        setModalDescription(
                            props.intl.formatMessage({
                                ...messages.pleaseCheckEmailAndPassword,
                            }),
                        );
                        handleOpenModal();
                    }

                    // setModalTitle(props.intl.formatMessage({ ...messages.loginFailed }));
                    // setModalDescription(props.intl.formatMessage({ ...messages.invalidEmailPassword }))
                    // handleOpenModal();
                    let body = {
                        firstName: newFirstname,
                        lastName: newLastname,
                        userName: newUsername,
                        password: newPassword,
                        email: newEmail,
                        phone: newMobileNo,
                        role: 0,
                        clientID: 'gfas67zjh9q',
                        ipAddress: '192.168.11.3',
                    };
                    setRegisterLoading(true);

                    registerUser(body);
                    // props.apiManager.callApi(
                    //     APIURLS.register,
                    //     'POST',
                    //     body,

                    // );
                } else {
                    console.log(errors);
                    setModalTitle(
                        props.intl.formatMessage({
                            ...messages.validationError,
                        }),
                    );
                    setModalDescription(
                        props.intl.formatMessage({
                            ...messages.pleaseCheckEmailAndPassword,
                        }),
                    );
                    handleOpenModal();
                }
                break;
        }
    };

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    };

    const handleOpenModal = () => {
        setIsModalShown(true);
    };

    const handleOtpOpenModal = () => {
        setIsOtpModalShown(true);
    };

    const handleCloseModal = () => {
        setIsModalShown(false);
        if (props.intl.formatMessage({ ...messages.registerSuccessful })) {
            window.location.reload();
        } else {
            console.log('Eoooreroeow');
        }
    };

    const goToForgotPasswordScreen = () => {
        history.push(SCREENS.FORGOTPASSWORD);
    };

    return (
        <div className={classes.root}>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Img
                src={GPSinaLogoGrey}
                alt="GPSina Grey Logo"
                className={classes.logo}
            />
            <div className={classes.container}>
                <CustomModal
                    open={isModalShown}
                    handleClose={handleCloseModal}
                    type="simple"
                    title={modalTitle}
                    description={modalDescription}
                />
                <OtpDialogeBox
                    open={isOtpModalShown}
                    title={modalTitle}
                    otpResponse={otpBody}
                    handleClose={handleCloseModal}
                />
                <div className={classes.rightContainer}>
                    <FormattedMessage {...messages.language} />
                    <Button className={classes.btnLang} variant="contained">
                        <FormattedMessage {...messages.languageName} />
                        <Img
                            src={UKFlag}
                            alt="UK Flag"
                            className={classes.flagStyles}
                        />
                    </Button>
                </div>

                <form
                    id="login"
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <div className={classes.content}>
                        <Typography
                            variant="body1"
                            color="initial"
                            className={classes.textStyle}
                        >
                            <FormattedMessage {...messages.email} />
                        </Typography>
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            className={classes.textfield}
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            disableUnderline
                        />

                        <Typography
                            variant="body1"
                            color="initial"
                            className={classes.textStyle}
                        >
                            <FormattedMessage {...messages.password} />
                        </Typography>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            className={classes.textfield}
                            value={password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            disableUnderline
                        />

                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            direction="row"
                        >
                            <Grid container direction="row" alignItems="center">
                                <CheckBox
                                    checked={rememberMe}
                                    name="rememberMe"
                                    onChange={handleRemeberMe}
                                />
                                <Typography variant="body1" color="initial">
                                    <FormattedMessage
                                        {...messages.rememberMe}
                                    />
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                className={classes.link}
                                onClick={goToForgotPasswordScreen}
                            >
                                <FormattedMessage
                                    {...messages.forgotPassword}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="center">
                            <CheckBox
                                checked={autoLogin}
                                name="autoLogin"
                                onChange={handleAutoLogin}
                            />
                            <Typography
                                variant="body1"
                                color="initial"
                                className={classes.textStyle}
                            >
                                <FormattedMessage {...messages.autoLogin} />
                            </Typography>
                        </Grid>
                    </div>
                    {!loading && (
                        <Button
                            type="submit"
                            className={classes.btn}
                            variant="contained"
                        >
                            <FormattedMessage {...messages.login} />
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
                </form>

                <Typography
                    variant="body1"
                    color="initial"
                    className={classes.orStyles}
                >
                    <FormattedMessage {...messages.or} />
                </Typography>

                <form
                    id="signUp"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <div className={classes.content}>
                        <Typography
                            variant="body1"
                            color="initial"
                            className={classes.textStyle}
                        >
                            <FormattedMessage {...messages.firstname} />
                        </Typography>
                        <Input
                            id="newFirstname"
                            type="text"
                            name="newFirstname"
                            className={classes.textfieldSignUp}
                            value={newFirstname}
                            onChange={handleChange}
                            type="email"
                            placeholder="Enter firstname"
                            disableUnderline
                        />
                        {errors.newFirstname.length > 0 && (
                            <span className={classes.error}>
                                {errors.newFirstname}
                            </span>
                        )}

                        <Typography
                            variant="body1"
                            color="initial"
                            className={classes.textStyle}
                        >
                            <FormattedMessage {...messages.lastname} />
                        </Typography>
                        <Input
                            id="newLastname"
                            type="text"
                            name="newLastname"
                            className={classes.textfieldSignUp}
                            value={newLastname}
                            onChange={handleChange}
                            type="email"
                            placeholder="Enter lastname"
                            disableUnderline
                        />
                        {errors.newLastname.length > 0 && (
                            <span className={classes.error}>
                                {errors.newLastname}
                            </span>
                        )}

                        <Typography
                            variant="body1"
                            color="initial"
                            className={classes.textStyle}
                        >
                            <FormattedMessage {...messages.username} />
                        </Typography>
                        <Input
                            id="newUsername"
                            type="text"
                            name="newUsername"
                            className={classes.textfieldSignUp}
                            value={newUsername}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter username"
                            disableUnderline
                        />
                        {errors.newUsername.length > 0 && (
                            <span className={classes.error}>
                                {errors.newUsername}
                            </span>
                        )}

                        <Typography
                            variant="body1"
                            color="initial"
                            className={classes.textStyle}
                        >
                            <FormattedMessage {...messages.email} />
                        </Typography>
                        <Input
                            id="newEmail"
                            name="newEmail"
                            className={classes.textfieldSignUp}
                            value={newEmail}
                            onChange={handleChange}
                            type="email"
                            placeholder="Enter Email"
                            disableUnderline
                        />
                        {errors.newEmail.length > 0 && (
                            <span className={classes.error}>
                                {errors.newEmail}
                            </span>
                        )}

                        <Typography
                            variant="body1"
                            color="initial"
                            className={classes.textStyle}
                        >
                            <FormattedMessage {...messages.mobileNo} />
                        </Typography>
                        <Input
                            id="newMobileNo"
                            type="number"
                            name="newMobileNo"
                            className={classes.textfieldSignUp}
                            value={newMobileNo}
                            onChange={handleChange}
                            placeholder="Enter Mobile No"
                            disableUnderline
                        />
                        {errors.newMobileNo.length > 0 && (
                            <span className={classes.error}>
                                {errors.newMobileNo}
                            </span>
                        )}

                        <Typography
                            variant="body1"
                            color="initial"
                            className={classes.textStyle}
                        >
                            <FormattedMessage {...messages.password} />
                        </Typography>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            className={classes.textfieldSignUp}
                            value={newPassword}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            disableUnderline
                        />
                        {errors.newPassword.length > 0 && (
                            <span className={classes.error}>
                                {errors.newPassword}
                            </span>
                        )}

                        <Typography
                            variant="body1"
                            color="initial"
                            className={classes.textStyle}
                        >
                            <FormattedMessage {...messages.confirmPassword} />
                        </Typography>
                        <Input
                            id="newConfirmPassword"
                            name="newConfirmPassword"
                            type="password"
                            className={classes.textfieldSignUp}
                            value={newConfirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            disableUnderline
                        />
                        {errors.newConfirmPassword.length > 0 && (
                            <span className={classes.error}>
                                {errors.newConfirmPassword}
                            </span>
                        )}
                    </div>

                    {!registerLoading && (
                        <Button
                            type="submit"
                            className={classes.btn}
                            variant="contained"
                        >
                            <FormattedMessage {...messages.signUp} />
                        </Button>
                    )}
                    {registerLoading && (
                        <Digital
                            color="#ffa500"
                            size={32}
                            speed={1}
                            animating={registerLoading}
                        />
                    )}
                </form>
            </div>
        </div>
    );
}

LoginPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        login: selectLogin(state),
        email: makeSelectEmail(state),
        password: makeSelectPassword(state),
        newEmail: makeSelectNewEmail(state),
        autoLogin: makeSelectAutoLogin(state),
        rememberMe: makeSelectRememberMe(state),
        newPassword: makeSelectNewPassword(state),
        confirmPassword: makeSelectNewConfirmPassword(state),
    };
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(LoginPage));
