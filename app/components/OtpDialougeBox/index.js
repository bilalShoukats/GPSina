import { compose } from 'redux';
import messages from './messages';
import { connect } from 'react-redux';
import OtpInput from 'react-otp-input';
import { useStyles } from './styles.js';
import { Sentry } from 'react-activity';
import 'react-activity/dist/Sentry.css';
import SCREENS from '../../constants/screen';
import APIURLS from '../../ApiManager/apiUrl';
import React, { useState, useEffect } from 'react';
import ApiManager from '../../ApiManager/ApiManager';
import CustomModal from '../../components/CustomModal';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Button, Grid, Modal, Typography, Box } from '@material-ui/core';

export function OtpDialogeBox(props) {
    const classes = useStyles(props);
    const [otp, setOtp] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState(false);
    const [titleMsg, setTitleMsg] = useState('');
    const [description, setDescription] = useState('');
    const [verificationFlag, setVerificationFlag] = useState(false);
    const [modalFlag, setModalFlag] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
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
        console.log('Typed Otp : ', otp);
    };

    const handleCloseModal = message => {
        setModalFlag(false);
        console.log('Descrpition : ', messages);

        if (
            message === messages.pleaseLoginUsingThisCredential.defaultMessage
        ) {
            history.push(SCREENS.LOGIN);
        }
    };

    const handleVerify = async () => {
        setVerifyLoading(true);
        console.log('OTP to be verified : ', parseInt(otp));
        const body = {
            email: otpBody.email,
            code: parseInt(otp),
            hash: otpBody.hash,
        };
        const api = ApiManager.getInstance();
        api.send('POST', APIURLS.validateOtp, body)
            .then(res => {
                setVerifyLoading(false);
                console.log('Validate Otp Response Object : ', res);
                if (res.data.code === 6019) {
                    setVerificationFlag(true);
                    // setTitleMsg(
                    //     props.intl.formatMessage({
                    //         ...messages.verificationSuccess,
                    //     }),
                    // );
                    // setDescription(
                    //     props.intl.formatMessage({
                    //         ...messages.pleaseLoginUsingThisCredential,
                    //     }),
                    // );
                    setTitleMsg(messages.verificationSuccess.defaultMessage);
                    setDescription(
                        messages.pleaseLoginUsingThisCredential.defaultMessage,
                    );
                }
            })
            .catch(error => {
                setVerifyLoading(false);
                setModalFlag(true);
                // setTitleMsg(
                //     props.intl.formatMessage({
                //         ...messages.verificationFailed,
                //     }),
                // );
                // setDescription(
                //     props.intl.formatMessage({
                //         ...messages.networkError,
                //     }),
                // );
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
                setResendLoading(false);
                if (res.data.code === 6014) {
                    setOtpBody({
                        email: res.data.response.email,
                        expireAt: res.data.response.expireAt,
                        hash: res.data.response.hash,
                    });
                } else {
                    setModalFlag(true);
                    // setTitleMsg(
                    //     props.intl.formatMessage({
                    //         ...messages.resendFailed,
                    //     }),
                    // );
                    // setDescription(
                    //     props.intl.formatMessage({
                    //         ...messages.badBodyRequest,
                    //     }),
                    // );
                    setTitleMsg(messages.resendFailed.defaultMessage);
                    setDescription(messages.badBodyRequest.defaultMessage);
                }
                console.log('Resend OTP Response Object : ', res);
            })
            .catch(error => {
                setResendLoading(false);
                setModalFlag(true);
                // setTitleMsg(
                //     props.intl.formatMessage({
                //         ...messages.resendFailed,
                //     }),
                // );
                // setDescription(
                //     props.intl.formatMessage({
                //         ...messages.networkError,
                //     }),
                // );
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
                    <div className={classes.simpleModal}>
                        <Grid
                            container
                            spacing={1}
                            justifyContent="center"
                            direction="column"
                            alignItems="center"
                        >
                            <div className={classes.textContainer}>
                                <Typography variant="body1" align="center">
                                    {props.title}
                                </Typography>
                                <OtpInput
                                    value={otp}
                                    onChange={handleChange}
                                    numInputs={6}
                                    isInputNum={true}
                                    containerStyle={classes.otpBoxStyle}
                                    inputStyle={classes.otpInputStyle}
                                    separator={<span>-</span>}
                                    isDisabled={!timer}
                                />
                                {/* <Typography variant="body1" align="center">
                                    <FormattedMessage
                                        {...messages.verificationFailed}
                                    />
                                </Typography> */}
                            </div>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Button
                                    onClick={handleVerify}
                                    className={classes.btnContainer}
                                    disabled={otp.length < 6 || verifyLoading}
                                >
                                    <Typography variant="body1" align="center">
                                        <FormattedMessage
                                            {...messages.verifyOtp}
                                        />
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid
                                container
                                justifyContent="center"
                                direction="column"
                                alignItems="center"
                            >
                                <Button
                                    onClick={handleResend}
                                    className={classes.btnContainer}
                                    disabled={timer || resendLoading}
                                >
                                    <Typography variant="body1" align="center">
                                        <FormattedMessage
                                            {...messages.resendOtp}
                                        />
                                    </Typography>
                                </Button>
                                <Box>
                                    {!verifyLoading && !resendLoading && (
                                        <Typography
                                            align="center"
                                            style={{
                                                fontWeight: 'bold',
                                                paddingBottom: '10px',
                                            }}
                                        >
                                            {!timer ? (
                                                <h3>{`OTP Expired`}</h3>
                                            ) : (
                                                <h3>
                                                    {`OTP expire after 
                                            ${minutes} minutes and ${seconds} seconds`}
                                                </h3>
                                            )}
                                        </Typography>
                                    )}
                                    {(verifyLoading || resendLoading) && (
                                        <Typography
                                            align="center"
                                            style={{
                                                fontWeight: 'bold',
                                                paddingBottom: '10px',
                                            }}
                                        >
                                            <Sentry
                                                color="#ffa500"
                                                size={32}
                                                speed={1}
                                                animating={
                                                    verifyLoading ||
                                                    resendLoading
                                                }
                                            />
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
            )}
            {verificationFlag && (
                <CustomModal
                    open={verificationFlag}
                    close={() =>
                        handleClose(
                            messages.pleaseLoginUsingThisCredential
                                .defaultMessage,
                        )
                    }
                    type="simple"
                    title={titleMsg}
                    description={description}
                />
            )}
            {/* <CustomModal
                open={modalFlag}
                close={() => handleCloseModal(description)}
                type="simple"
                title={titleMsg}
                description={description}
            /> */}
        </div>
    );
}

const withConnect = connect();

export default compose(withConnect)(injectIntl(OtpDialogeBox));
