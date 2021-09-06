import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addDriverPage state domain
 */

const selectAddDriverPageDomain = state => state.addDriverPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddDriverPage
 */

const makeSelectAddDriverPage = () =>
  createSelector(
    selectAddDriverPageDomain,
    substate => substate,
  );

export default makeSelectAddDriverPage;
export { selectAddDriverPageDomain };
