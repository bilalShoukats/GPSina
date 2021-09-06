/*
 *
 * LoginPage actions
 *
 */

import {
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    CHANGE_NEW_EMAIL,
    CHANGE_NEW_PASSWORD,
    CHANGE_NEW_CONFIRM_PASSWORD,
    AUTO_LOGIN,
    REMEMBER_ME,
} from './constants';

export function changeEmail(email) {
    return {
        type: CHANGE_EMAIL,
        email,
    };
}

export function changePassword(password) {
    return {
        type: CHANGE_PASSWORD,
        password,
    };
}

export function changeNewEmail(newEmail) {
    return {
        type: CHANGE_NEW_EMAIL,
        newEmail,
    };
}

export function changeNewPassword(newPassword) {
    return {
        type: CHANGE_NEW_PASSWORD,
        newPassword,
    };
}

export function changeNewConfirmPassword(newConfirmPassword) {
    return {
        type: CHANGE_NEW_CONFIRM_PASSWORD,
        newConfirmPassword,
    };
}

export function changeRememberMe(rememberMe) {
    return {
        type: REMEMBER_ME,
        rememberMe,
    };
}

export function changeAutoLogin(autoLogin) {
    return {
        type: AUTO_LOGIN,
        autoLogin,
    };
}
