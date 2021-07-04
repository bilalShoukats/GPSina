/*
 *
 * Route actions
 *
 */

import { SET_IS_LOGGED_IN, SET_IS_RESTRICTED } from './constants';

/**
 * Changes the login state
 *
 * @param  {string} isLoggedIn The login state
 *
 * @return {object} An action object with a type of SET_IS_LOGGED_IN
 */
export function setIsLoggedIn(isLoggedIn) {
  return {
    type: SET_IS_LOGGED_IN,
    isLoggedIn,
  };
}

/**
 * Changes the login state
 *
 * @param  {string} isRestricted The route restriction state
 *
 * @return {object} An action object with a type of SET_IS_RESTRICTED
 */
export function setIsRestricted(isRestricted) {
  return {
    type: SET_IS_RESTRICTED,
    isRestricted,
  };
}
