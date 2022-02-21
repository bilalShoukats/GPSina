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
    inValidUserNameLength: {
        id: `${scope}.inValidUserNameLength`,
        defaultMessage: 'Username must be 8-20 charactres Long',
    },
    inValidPasswordLength: {
        id: `${scope}.inValidPasswordLength`,
        defaultMessage: 'Password must be 8-20 charactres Long',
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
    generalError: {
        id: `${scope}.generalError`,
        defaultMessage: 'Error',
    },
    validationError: {
        id: `${scope}.validationError`,
        defaultMessage: 'Validation Error',
    },
    pleaseCheckEmailAndPassword: {
        id: `${scope}.pleaseCheckEmailAndPassword`,
        defaultMessage: 'Please Check Email and Password',
    },
    firstname: {
        id: `${scope}.firstname`,
        defaultMessage: 'first name',
    },
    lastname: {
        id: `${scope}.lastname`,
        defaultMessage: 'last name',
    },
    username: {
        id: `${scope}.username`,
        defaultMessage: 'username',
    },
    inValidName: {
        id: `${scope}.inValidName`,
        defaultMessage: 'Name must be 3-30 charactres Long',
    },
    invalidMobileNo: {
        id: `${scope}.invalidMobileNo`,
        defaultMessage: 'invalid mobile no',
    },
    mobileNo: {
        id: `${scope}.mobileNo`,
        defaultMessage: 'mobile no',
    },
    pleaseLoginUsingThisCredential: {
        id: `${scope}.pleaseLoginUsingThisCredential`,
        defaultMessage: 'Please login using this credentials',
    },
    registerSuccessful: {
        id: `${scope}.registerSuccessful`,
        defaultMessage: 'Registration Successful',
    },
    registerFailed: {
        id: `${scope}.registerFailed`,
        defaultMessage: 'Registration Failed',
    },
    verifyOtp: {
        id: `${scope}.verifyOtp`,
        defaultMessage: 'Check your email to verify this OTP',
    },
    badBodyRequest: {
        id: `${scope}.badBodyRequest`,
        defaultMessage: 'Invalid Inputs',
    },
    networkError: {
        id: `${scope}.networkError`,
        defaultMessage: 'Network Error',
    },
    fillAllInputs: {
        id: `${scope}.fillAllInputs`,
        defaultMessage: 'All Inputs Required',
    },
    dbError: {
        id: `${scope}.dbError`,
        defaultMessage: 'Undefined Database Error',
    },
    dupliacteError: {
        id: `${scope}.dupliacteError`,
        defaultMessage: 'Duplicate Username, Email or Password',
    },
});
