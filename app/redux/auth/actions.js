import {
    SET_USER,
    LOGIN_USER,
    LOGOUT_USER,
    CHANGE_LOADING,
    LOGIN_USER_ERROR,
    SET_SESSION_USER,
    LOGIN_USER_SUCCESS,
    HANDLE_OTP,
    LOGIN_PHONE_USER
} from '../actions';

export const setSession = sessionId => ({
    type: SET_SESSION_USER,
    payload: { sessionId },
});

export const loginUser = (body, history) => ({
    type: LOGIN_USER,
    payload: { body, history },
});

export const loginPhoneUser = (body, history) => ({
    type: LOGIN_PHONE_USER,
    payload: { body, history },
});

export const handleOtp = (body) => ({
    type: HANDLE_OTP,
    payload: { body },
});

export const loginUserSuccess = (token, user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: { token: token, user: user },
});

export const changeLoading = loading => ({
    type: CHANGE_LOADING,
    payload: { loading },
});

export const loginUserError = message => ({
    type: LOGIN_USER_ERROR,
    payload: { message },
});

export const setUser = user => ({
    type: SET_USER,
    payload: { user },
});

export const logoutUser = history => ({
    type: LOGOUT_USER,
    payload: { history },
});
