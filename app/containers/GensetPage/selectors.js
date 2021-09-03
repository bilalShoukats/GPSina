import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gensetPage state domain
 */

const selectGensetPageDomain = state => state.gensetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GensetPage
 */

const makeSelectGensetPage = () =>
  createSelector(
    selectGensetPageDomain,
    substate => substate,
  );

export default makeSelectGensetPage;
export { selectGensetPageDomain };
