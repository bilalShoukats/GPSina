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
    atLeast5Character: {
        id: `${scope}.atLeast5Character`,
        defaultMessage: 'must at least 5 characters',
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
});
