import { compose } from 'redux';
import messages from './messages';
import { connect } from 'react-redux';
import OtpInput from 'react-otp-input';
import { useStyles } from './styles.js';
import 'react-activity/dist/Sentry.css';
import SCREENS from '../../constants/screen';
import APIURLS from '../../ApiManager/apiUrl';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ApiManager from '../../ApiManager/ApiManager';
import CustomModal from '../../components/CustomModal';
import { FormattedMessage, injectIntl } from 'react-intl';
import defaultProfileImage from '../../../assets/images/icons/otp.svg';
import { Button, Grid, Modal, Typography, Avatar } from '@material-ui/core';
import { Manager } from '../../StorageManager/Storage';
import { loginPhoneUser } from '../../redux/auth/actions';
import PropTypes from 'prop-types';

export function OtpDialogeBox(props) {
    const history = useHistory();
    const classes = useStyles(props);
    const [otp, setOtp] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState(false);
    const [titleMsg, setTitleMsg] = useState('');
    const [modalFlag, setModalFlag] = useState(false);
    const [description, setDescription] = useState('');
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [verificationFlag, setVerificationFlag] = useState(false);

    const [otpBody, setOtpBody] = useState({
        email: props.otpResponse.email,
        hash: props.otpResponse.hash,
        expireAt: props.otpResponse.expireAt,
    });

    let timerId = null;
    const getMinutes = timeStamp => {
        let minutes = 0;
        let totalTime = timeStamp - Math.floor(Date.now() / 1000);
        if (totalTime > 60) {
            minutes = Math.floor(totalTime / 60);
        }
        return minutes;
    };

    const getSeconds = timeStamp => {
        let seconds = 0;
        let totalTime = timeStamp - Math.floor(Date.now() / 1000);
        if (totalTime > 60) {
            seconds = totalTime % 60;
        } else {
            seconds = totalTime;
        }
        return seconds;
    };

    const handleChange = otp => {
        setOtp(otp);
    };

    const handleCloseModal = () => {
        setModalFlag(false);
        history.push(SCREENS.LOGIN);
    };
    // const reLoadUser = () => {
    //     Manager.getItem('email', true).then(result => {
    //       this.setState({ user: result, loaded: true });
    //     });
    //   };
    const handleVerify = async () => {
        setVerifyLoading(true);
        // let email=localStorage.getItem('email',email)
        // let hash=localStorage.getItem('hash',hash)
        // let numberr=localStorage.getItem('LoginnewMobileNo')
        
        

        const body = {
            email: props.otpResponse.email,
            code: parseInt(otp),
            hash: props.otpResponse.hash,
            type:0,
            phone:props.otpResponse.phone
        };
        console.log("body>>>>>>",body)
        const api = ApiManager.getInstance();
        api.send('POST', APIURLS.validateOtp, body)
            .then(res => {
                console.log('res  data.code', res.data.code);
                setVerifyLoading(false);
                if (res.data.code === 1011) {

                    console.log('user data response>>1 after success code', res);
                    localStorage.setItem('hash', res.data.response.hash);
                    localStorage.setItem('email', res.data.response.email);
                    let tempNumber = localStorage.getItem('LoginnewMobileNo');

                    // console.log('tempNumber==<', tempNumber);
                    // console.log('props.otpResponse.email==<', props.otpResponse.email);
                    // console.log('props.otpResponse.hash==<', props.otpResponse.hash);

                    // props.apiManager.saveToken(
                    //     props.otpResponse.email,
                    //     props.otpResponse.hash,
                    // );
                    // history.push(SCREENS.HOME);

                    //successfully log in
                    localStorage.removeItem('LoginnewMobileNo')
                    setVerificationFlag(true);
                    setTitleMsg(messages.verificationSuccess.defaultMessage);
                    setDescription(
                        messages.pleaseLoginUsingThisCredential.defaultMessage,
                    )
                    var phoneBody = {
                        email: res.data.response.email,
                        hash: res.data.response.hash,
                        userName: res.data.response.userName,
                        phone: props.otpResponse.phone
                    }
                    props.prevProps.dispatch(loginPhoneUser(phoneBody, history));
                    console.log("props.apiManager",props.apiManager.saveToken());
                    
                }
            })
            .catch(error => {
                setVerifyLoading(false);
                setModalFlag(true);
                setTitleMsg(messages.verificationFailed.defaultMessage);
                setDescription(messages.networkError.defaultMessage);
            });
    };

    const handleResend = async () => {
        const body = {
            hash: otpBody.hash,
            email: otpBody.email,
        };
    //  const usehash=   localStorage.setItem(hash);
    //  const useEmail=   localStorage.setItem( email);

        setResendLoading(true);
        const api = ApiManager.getInstance();
        api.send('POST', APIURLS.resendOtp, body)
            .then(res => {
                setOtp('');
                setResendLoading(false);
                if (res.data.code === 6014) {
                    clearInterval(timerId);
                    setTimer(false);
                } else {
                    setModalFlag(true);
                    setTitleMsg(messages.resendFailed.defaultMessage);
                    setDescription(messages.badBodyRequest.defaultMessage);
                }
            })
            .catch(error => {
                setResendLoading(false);
                setModalFlag(true);
                setTitleMsg(messages.resendFailed.defaultMessage);
                setDescription(messages.networkError.defaultMessage);
            });
    };

    useEffect(() => {
        if (props.open) {
            console.log("props params: ", props.otpResponse)
            setOtpBody({
                hash: props.otpResponse.hash,
                email: props.otpResponse.email,
                expireAt: props.otpResponse.expireAt,
                phone: props.otpResponse.phone
            });
        }
    }, [props.open]);

    const startCounter = () => {
        timerId = setInterval(() => {
            if (otpBody.expireAt - Math.floor(Date.now() / 1000) > 0) {
                setMinutes(getMinutes(otpBody.expireAt));
                setSeconds(getSeconds(otpBody.expireAt));
            } else {
                setTimer(false);
                clearInterval(timerId);
                setOtp('');
            }
        }, 1000);
    };

    useEffect(() => {
        if (otpBody.expireAt !== 0) {
            setMinutes(getMinutes(otpBody.expireAt));
            setSeconds(getSeconds(otpBody.expireAt));
            setTimer(true);
        }
    }, [otpBody]);

    useEffect(() => {
        if (timer) {
            startCounter();
        }
    }, [timer]);

    return (
        <div>
            {!verificationFlag && (
                <Modal
                    className={classes.modal}
                    open={props.open}
                    aria-labelledby={props.title}
                >
                    <div className={classes.otpModal}>
                        <Grid
                            container
                            spacing={1}
                            justifyContent="center"
                            direction="column"
                            alignItems="center"
                        >
                            <Avatar
                                alt="OTP Verification Logo"
                                src={defaultProfileImage}
                                varient="square"
                                style={{
                                    width: 140,
                                    height: 140,
                                    margin: '10px',
                                }}
                            />
                            <div className={classes.titleContainer}>
                                <Typography variant="h4" align="center">
                                    <FormattedMessage {...messages.title} />
                                </Typography>
                            </div>
                            <div className={classes.center}>
                                <Typography
                                    variantMapping="string"
                                    align="center"
                                >
                                    <FormattedMessage
                                        {...messages.otpTitleContex}
                                    />
                                </Typography>
                            </div>
                            <div className={classes.otpBoxStyle}>
                                <OtpInput
                                    value={otp}
                                    onChange={handleChange}
                                    numInputs={6}
                                    isInputNum={true}
                                    // containerStyle={classes.otpBoxStyle}
                                    // inputStyle={classes.otpInputStyle}
                                    // // separator={<span>- </span>}
                                   // isDisabled={!timer}
                                />
                            </div>

                            <div className={classes.center}>
                                <Typography
                                    variantMapping="subtitle2"
                                    align="center"
                                >
                                    <FormattedMessage
                                        {...messages.resendMessage}
                                    />
                                </Typography>

                                <Button
                                    onClick={handleResend}
                                    className={
                                        resendLoading
                                            ? classes.btnContainerDisabled
                                            : classes.btnContainer
                                    }
                                    disabled={resendLoading}
                                >
                                    <Typography
                                        variant="body2"
                                        align="center"
                                        gutterBottom={true}
                                    >
                                        <FormattedMessage
                                            {...messages.resendOtp}
                                        />
                                    </Typography>
                                </Button>

                                {!verifyLoading && !resendLoading && !timer && (
                                    <Typography align="center" variant="body1">
                                        <FormattedMessage
                                            {...messages.otpExpired}
                                        />
                                    </Typography>
                                )}
                                {!verifyLoading && !resendLoading && timer && (
                                    <Typography align="center" variant="body1">
                                        {`OTP expire after ${minutes} minutes and ${seconds} seconds`}
                                    </Typography>
                                )}
                                <Typography
                                    variant="body2"
                                    align="center"
                                    className={classes.errorContainer}
                                >
                                    {description}
                                </Typography>
                                <Button
                                    onClick={handleVerify}
                                    className={classes.verifybtnContainer}
                                    disabled={otp.length < 6 || verifyLoading}
                                >
                                    <Typography variant="h6" align="center">
                                        <FormattedMessage
                                            {...messages.verifyOtp}
                                        />
                                    </Typography>
                                </Button>
                            </div>
                        </Grid>
                    </div>
                </Modal>
            )}
            {verificationFlag && (
                <CustomModal
                    open={verificationFlag}
                    handleClose={handleCloseModal}
                    type="simple"
                    title={titleMsg}
                    description={description}
                />
            )}
        </div>
    );
}

OtpDialogeBox.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(OtpDialogeBox));
