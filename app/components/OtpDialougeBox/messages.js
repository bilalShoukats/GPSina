/*
 * CustomModal Messages
 *
 * This contains all the text for the CustomModal component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.OtpDialougeBox';

export default defineMessages({
    verifyOtp: {
        id: `${scope}.verifyOtp`,
        defaultMessage: 'Verify OTP',
    },
    resendOtp: {
        id: `${scope}.resendOtp`,
        defaultMessage: 'Resend OTP',
    },
    pleaseLoginUsingThisCredential: {
        id: `${scope}.pleaseLoginUsingThisCredential`,
        defaultMessage: 'Please login using this credentials',
    },
    registerSuccessful: {
        id: `${scope}.registerSuccessful`,
        defaultMessage: 'Registration Successful',
    },
    networkError: {
        id: `${scope}.networkError`,
        defaultMessage: 'Network Error',
    },
    resendFailed: {
        id: `${scope}.resendfailed`,
        defaultMessage: 'Resend Failed',
    },
    badBodyRequest: {
        id: `${scope}.badBodyRequest`,
        defaultMessage: 'Invalid OTP',
    },
    verificationFailed: {
        id: `${scope}.verificationFailed`,
        defaultMessage: 'Verification Failed',
    },
    verificationSuccess: {
        id: `${scope}.verificationSuccess`,
        defaultMessage: 'OTP Verified',
    },
});
