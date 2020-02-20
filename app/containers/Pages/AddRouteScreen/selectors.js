import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addRouteScreen state domain
 */

const selectAddRouteScreenDomain = state => state.addRouteScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddRouteScreen
 */

const makeSelectAddRouteScreen = () =>
  createSelector(
    selectAddRouteScreenDomain,
    substate => substate,
  );

export default makeSelectAddRouteScreen;
export { selectAddRouteScreenDomain };
