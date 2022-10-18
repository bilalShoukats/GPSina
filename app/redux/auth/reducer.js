import {
    SET_USER,
    LOGIN_USER,
    LOGOUT_USER,
    CHANGE_LOADING,
    LOGIN_USER_ERROR,
    SET_SESSION_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_PHONE_USER
} from '../actions';

const INIT_STATE = {
    error: '',
    user: null,
    token: null,
    loading: true,
    etSession: '',
   
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_SESSION_USER:
            return {
                ...state,
                error: '',
                etSession: action.payload.sessionId,
            };
        case LOGIN_USER:
            return {
                ...state,
                error: '',
                //loading: true,
            };
        case LOGIN_USER_SUCCESS:
            console.log('LOGIN_USER_SUCCESS', action.payload)
            return {
                ...state,
                error: '',
                //loading: false,
                user: action.payload.user,
                token: action.payload.token,
            };
        case LOGIN_PHONE_USER:
            console.log('LOGIN_USER_SUCCESS', action.payload);
            return {
                ...state,
                error: '',
                //loading: false,
                user: action.payload.user,
                token: action.payload.token,
            };
        case LOGIN_USER_ERROR:
            return {
                ...state,
                user: '',
                loading: false,
                error: action.payload.message,
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload.user,
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                token: null,
                loading: false,
            };
        case CHANGE_LOADING:
            return {
                ...state,
                loading: action.payload.loading,
            };
        default:
            return {
                ...state,
            };
    }
};
