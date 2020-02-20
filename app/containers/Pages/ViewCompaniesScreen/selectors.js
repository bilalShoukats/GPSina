import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewCompaniesScreen state domain
 */

const selectViewCompaniesScreenDomain = state => state.viewCompaniesScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewCompaniesScreen
 */

const makeSelectViewCompaniesScreen = () =>
  createSelector(
    selectViewCompaniesScreenDomain,
    substate => substate,
  );

export default makeSelectViewCompaniesScreen;
export { selectViewCompaniesScreenDomain };
