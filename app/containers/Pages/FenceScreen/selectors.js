import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fenceScreen state domain
 */

const selectFenceScreenDomain = state => state.fenceScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FenceScreen
 */

const makeSelectFenceScreen = () =>
  createSelector(
    selectFenceScreenDomain,
    substate => substate,
  );

export default makeSelectFenceScreen;
export { selectFenceScreenDomain };
