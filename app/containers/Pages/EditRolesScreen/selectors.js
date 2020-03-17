import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewUsersScreen state domain
 */

const selectViewUsersScreenDomain = state => state.viewUsersScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewUsersScreen
 */

const makeSelectViewUsersScreen = () =>
  createSelector(
    selectViewUsersScreenDomain,
    substate => substate,
  );

export default makeSelectViewUsersScreen;
export { selectViewUsersScreenDomain };
