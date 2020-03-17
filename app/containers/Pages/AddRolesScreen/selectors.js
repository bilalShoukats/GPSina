import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addUserScreen state domain
 */

const selectAddUserScreenDomain = state => state.addUserScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddUserScreen
 */

const makeSelectAddUserScreen = () =>
  createSelector(
    selectAddUserScreenDomain,
    substate => substate,
  );

export default makeSelectAddUserScreen;
export { selectAddUserScreenDomain };
