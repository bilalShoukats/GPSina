import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addZonePage state domain
 */

const selectAddZonePageDomain = state => state.addZonePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddZonePage
 */

const makeSelectAddZonePage = () =>
  createSelector(
    selectAddZonePageDomain,
    substate => substate,
  );

export default makeSelectAddZonePage;
export { selectAddZonePageDomain };
