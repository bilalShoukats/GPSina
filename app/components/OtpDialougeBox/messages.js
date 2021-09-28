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
});
