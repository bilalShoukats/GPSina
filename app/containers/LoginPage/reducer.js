/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
    AUTO_LOGIN,
    REMEMBER_ME,
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    CHANGE_NEW_EMAIL,
    CHANGE_NEW_PASSWORD,
    CHANGE_NEW_CONFIRM_PASSWORD,
} from './constants';

export const initialState = {
    email: '',
    newEmail: '',
   // password: '',
   // newPassword: '',
   // autoLogin: false,
   // rememberMe: false,
   // newConfirmPassword: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case CHANGE_EMAIL:
                draft.email = action.email;
                break;
            // case CHANGE_PASSWORD:
            //     draft.password = action.password;
            //     break;
            case CHANGE_NEW_EMAIL:
                draft.newEmail = action.newEmail;
                break;
            // case CHANGE_NEW_PASSWORD:
            //     draft.newPassword = action.newPassword;
            //     break;
            // case CHANGE_NEW_CONFIRM_PASSWORD:
            //     draft.newConfirmPassword = action.newConfirmPassword;
            //     break;
            // case REMEMBER_ME:
            //     draft.rememberMe = action.rememberMe;
            //     break;
            // case AUTO_LOGIN:
            //     draft.autoLogin = action.autoLogin;
            //     break;
        }
    });

export default loginPageReducer;
