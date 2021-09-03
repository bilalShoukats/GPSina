import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addGensetPage state domain
 */

const selectAddGensetPageDomain = state => state.addGensetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddGensetPage
 */

const makeSelectAddGensetPage = () =>
  createSelector(
    selectAddGensetPageDomain,
    substate => substate,
  );

export default makeSelectAddGensetPage;
export { selectAddGensetPageDomain };
