import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gensetDetailPage state domain
 */

const selectGensetDetailPageDomain = state =>
  state.gensetDetailPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GensetDetailPage
 */

const makeSelectGensetDetailPage = () =>
  createSelector(
    selectGensetDetailPageDomain,
    substate => substate,
  );

export default makeSelectGensetDetailPage;
export { selectGensetDetailPageDomain };
