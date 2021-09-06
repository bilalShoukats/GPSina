import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the poiPage state domain
 */

const selectPoiPageDomain = state => state.poiPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PoiPage
 */

const makeSelectPoiPage = () =>
  createSelector(
    selectPoiPageDomain,
    substate => substate,
  );

export default makeSelectPoiPage;
export { selectPoiPageDomain };
