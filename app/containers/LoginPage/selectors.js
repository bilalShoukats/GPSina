import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.login || initialState;

const makeSelectEmail = () =>
  createSelector(
    selectLogin,
    loginState => loginState.email,
  );

const makeSelectPassword = () =>
  createSelector(
    selectLogin,
    loginState => loginState.password,
  );

const makeSelectNewEmail = () =>
  createSelector(
    selectLogin,
    loginState => loginState.newEmail,
  );

const makeSelectNewPassword = () =>
  createSelector(
    selectLogin,
    loginState => loginState.newPassword,
  );

const makeSelectNewConfirmPassword = () =>
  createSelector(
    selectLogin,
    loginState => loginState.newConfirmPassword,
  );

const makeSelectRememberMe = () =>
  createSelector(
    selectLogin,
    loginState => loginState.rememberMe,
  );

const makeSelectAutoLogin = () =>
  createSelector(
    selectLogin,
    loginState => loginState.autoLogin,
  );

export {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectNewEmail,
  makeSelectNewPassword,
  makeSelectNewConfirmPassword,
  makeSelectRememberMe,
  makeSelectAutoLogin,
  selectLogin
};
