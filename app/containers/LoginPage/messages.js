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
  autoLogin: {
    id: `${scope}.autoLogin`,
    defaultMessage: 'Auto login',
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
  notValidEmail: {
    id: `${scope}.notValidEmail`,
    defaultMessage: 'Email is not valid!',
  },
  atLeast8Character: {
    id: `${scope}.atLeast8Character`,
    defaultMessage: 'Password must be at least 8 characters long!',
  },
  mismatchPassword: {
    id: `${scope}.mismatchPassword`,
    defaultMessage: 'Mismatch password',
  },
  loginFailed: {
    id: `${scope}.loginFailed`,
    defaultMessage: 'Login Failed',
  },
  invalidEmailPassword: {
    id: `${scope}.invalidEmailPassword`,
    defaultMessage: 'Invalid Email and Password',
  },
  validationError: {
    id: `${scope}.validationError`,
    defaultMessage: 'Validation Error',
  },
  pleaseCheckEmailAndPassword: {
    id: `${scope}.pleaseCheckEmailAndPassword`,
    defaultMessage: 'Please Check Email and Password',
  },
});
