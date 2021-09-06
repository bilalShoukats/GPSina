import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the driverPage state domain
 */

const selectDriverPageDomain = state => state.driverPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DriverPage
 */

const makeSelectDriverPage = () =>
  createSelector(
    selectDriverPageDomain,
    substate => substate,
  );

export default makeSelectDriverPage;
export { selectDriverPageDomain };
