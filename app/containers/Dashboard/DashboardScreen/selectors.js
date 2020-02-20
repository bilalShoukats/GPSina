import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardScreen state domain
 */

const selectDashboardScreenDomain = state =>
  state.dashboardScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DashboardScreen
 */

const makeSelectDashboardScreen = () =>
  createSelector(
    selectDashboardScreenDomain,
    substate => substate,
  );

export default makeSelectDashboardScreen;
export { selectDashboardScreenDomain };
