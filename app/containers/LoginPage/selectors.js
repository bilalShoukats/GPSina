import { initialState } from './reducer';
import { createSelector } from 'reselect';

const selectLogin = state => (state && state.login) || initialState;

const makeSelectEmail = createSelector(
    selectLogin,
    loginState => loginState.email,
);

const makeSelectPassword = createSelector(
    selectLogin,
    loginState => loginState.password,
);

const makeSelectNewEmail = createSelector(
    selectLogin,
    loginState => loginState.newEmail,
);

const makeSelectNewPassword = createSelector(
    selectLogin,
    loginState => loginState.newPassword,
);

const makeSelectNewConfirmPassword = createSelector(
    selectLogin,
    loginState => loginState.newConfirmPassword,
);

const makeSelectRememberMe = createSelector(
    selectLogin,
    loginState => loginState.rememberMe,
);

const makeSelectAutoLogin = createSelector(
    selectLogin,
    loginState => loginState.autoLogin,
);

export {
    selectLogin,
    makeSelectEmail,
    makeSelectPassword,
    makeSelectNewEmail,
    makeSelectAutoLogin,
    makeSelectRememberMe,
    makeSelectNewPassword,
    makeSelectNewConfirmPassword,
};
