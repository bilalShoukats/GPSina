import {
    SET_USER,
    LOGIN_USER,
    LOGOUT_USER,
    CHANGE_LOADING,
    LOGIN_USER_ERROR,
    SET_SESSION_USER,
    LOGIN_USER_SUCCESS,
} from '../actions';

export const setSession = sessionId => ({
    type: SET_SESSION_USER,
    payload: { sessionId },
});

export const loginUser = (body, history) => ({
    type: LOGIN_USER,
    payload: { body, history },
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
