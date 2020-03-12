import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addCompanyScreen state domain
 */

const selectAddCompanyScreenDomain = state => state.addCompanyScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddCompanyScreen
 */

const makeSelectAddCompanyScreen = () =>
  createSelector(
    selectAddCompanyScreenDomain,
    substate => substate,
  );

export default makeSelectAddCompanyScreen;
export { selectAddCompanyScreenDomain };
