/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language',
  },
  languageName: {
    id: `${scope}.languageName`,
    defaultMessage: 'English',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login ',
  },
  signUp: {
    id: `${scope}.signUp`,
    defaultMessage: 'Sign Up',
  },
  or: {
    id: `${scope}.or`,
    defaultMessage: 'or',
  },
  rememberMe: {
    id: `${scope}.rememberMe`,
    defaultMessage: 'Remember Me',
  },
  forgotPassword: {
    id: `${scope}.forgotPassword`,
    defaultMessage: 'Forgot Password',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Confirm Password',
  },
});
