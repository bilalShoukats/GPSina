import { initialState } from './reducer';
import { createSelector } from 'reselect';

const selectLogin = state => (state && state.login) || initialState;

const makeSelectEmail = createSelector(
    selectLogin,
    loginState => loginState.email,
);

const makeSelectLoginPhone = createSelector(
    selectLogin,
    loginState => loginState.loginPhone,
);

const makeSelectNewEmail = createSelector(
    selectLogin,
    loginState => loginState.newEmail,
);

// const makeSelectNewPassword = createSelector(
//     selectLogin,
//     loginState => loginState.newPassword,
// );

// const makeSelectNewConfirmPassword = createSelector(
//     selectLogin,
//     loginState => loginState.newConfirmPassword,
// );

// const makeSelectRememberMe = createSelector(
//     selectLogin,
//     loginState => loginState.rememberMe,
// );

// const makeSelectAutoLogin = createSelector(
//     selectLogin,
//     loginState => loginState.autoLogin,
// );

const makeSelectError = createSelector(
    selectLogin,
    loginState => loginState.error,
);

export {
    selectLogin,
    makeSelectError,
    makeSelectEmail,
    makeSelectLoginPhone,
    makeSelectNewEmail,
    // makeSelectAutoLogin,
    // makeSelectRememberMe,
    // makeSelectNewPassword,
    // makeSelectNewConfirmPassword,
};
