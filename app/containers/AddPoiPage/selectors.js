import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addPoiPage state domain
 */

const selectAddPoiPageDomain = state => state.addPoiPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddPoiPage
 */

const makeSelectAddPoiPage = () =>
  createSelector(
    selectAddPoiPageDomain,
    substate => substate,
  );

export default makeSelectAddPoiPage;
export { selectAddPoiPageDomain };
