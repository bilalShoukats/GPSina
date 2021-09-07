import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the zoneDetailPage state domain
 */

const selectZoneDetailPageDomain = state =>
  state.zoneDetailPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ZoneDetailPage
 */

const makeSelectZoneDetailPage = () =>
  createSelector(
    selectZoneDetailPageDomain,
    substate => substate,
  );

export default makeSelectZoneDetailPage;
export { selectZoneDetailPageDomain };
