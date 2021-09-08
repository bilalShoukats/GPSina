import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the poiDetailPage state domain
 */

const selectPoiDetailPageDomain = state => state.poiDetailPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PoiDetailPage
 */

const makeSelectPoiDetailPage = () =>
  createSelector(
    selectPoiDetailPageDomain,
    substate => substate,
  );

export default makeSelectPoiDetailPage;
export { selectPoiDetailPageDomain };
