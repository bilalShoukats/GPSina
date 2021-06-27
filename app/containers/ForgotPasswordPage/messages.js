/*
 * ForgotPasswordPage Messages
 *
 * This contains all the text for the ForgotPasswordPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ForgotPasswordPage';

export default defineMessages({
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back',
  },
  reset: {
    id: `${scope}.reset`,
    defaultMessage: 'Reset',
  },
});
