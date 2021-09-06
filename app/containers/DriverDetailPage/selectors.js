import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the driverDetailPage state domain
 */

const selectDriverDetailPageDomain = state =>
  state.driverDetailPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DriverDetailPage
 */

const makeSelectDriverDetailPage = () =>
  createSelector(
    selectDriverDetailPageDomain,
    substate => substate,
  );

export default makeSelectDriverDetailPage;
export { selectDriverDetailPageDomain };
