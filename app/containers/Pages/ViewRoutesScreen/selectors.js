import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewRoutesScreen state domain
 */

const selectViewRoutesScreenDomain = state => state.viewRoutesScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewRoutesScreen
 */

const makeSelectViewRoutesScreen = () =>
  createSelector(
    selectViewRoutesScreenDomain,
    substate => substate,
  );

export default makeSelectViewRoutesScreen;
export { selectViewRoutesScreenDomain };
