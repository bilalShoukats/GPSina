import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the zonePage state domain
 */

const selectZonePageDomain = state => state.zonePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ZonePage
 */

const makeSelectZonePage = () =>
  createSelector(
    selectZonePageDomain,
    substate => substate,
  );

export default makeSelectZonePage;
export { selectZonePageDomain };
