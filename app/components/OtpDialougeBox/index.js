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
        email: '',
        hash: '',
        expireAt: 0,
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

    const handleVerify = async () => {
        setVerifyLoading(true);
        const body = {
            email: otpBody.email,
            code: parseInt(otp),
            hash: otpBody.hash,
        };
        const api = ApiManager.getInstance();
        api.send('POST', APIURLS.validateOtp, body)
            .then(res => {
                setVerifyLoading(false);
                if (res.data.code === 6019) {
                    setVerificationFlag(true);
                    setTitleMsg(messages.verificationSuccess.defaultMessage);
                    setDescription(
                        messages.pleaseLoginUsingThisCredential.defaultMessage,
                    );
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
            setOtpBody({
                hash: props.otpResponse.hash,
                email: props.otpResponse.email,
                expireAt: props.otpResponse.expireAt,
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
                                    containerStyle={classes.otpBoxStyle}
                                    inputStyle={classes.otpInputStyle}
                                    separator={<span>- </span>}
                                    isDisabled={!timer}
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

const withConnect = connect();

export default compose(withConnect)(injectIntl(OtpDialogeBox));
