import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editRouteScreen state domain
 */

const selectEditRouteScreenDomain = state => state.editRouteScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditRouteScreen
 */

const makeSelectEditRouteScreen = () =>
  createSelector(
    selectEditRouteScreenDomain,
    substate => substate,
  );

export default makeSelectEditRouteScreen;
export { selectEditRouteScreenDomain };
