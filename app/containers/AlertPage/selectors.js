import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the alertPage state domain
 */

const selectAlertPageDomain = state => state.alertPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AlertPage
 */

const makeSelectAlertPage = () =>
  createSelector(
    selectAlertPageDomain,
    substate => substate,
  );

export default makeSelectAlertPage;
export { selectAlertPageDomain };
