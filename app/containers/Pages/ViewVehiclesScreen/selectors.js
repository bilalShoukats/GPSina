import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewVehiclesScreen state domain
 */

const selectViewVehiclesScreenDomain = state => state.viewVehiclesScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewVehiclesScreen
 */

const makeSelectViewVehiclesScreen = () =>
  createSelector(
    selectViewVehiclesScreenDomain,
    substate => substate,
  );

export default makeSelectViewVehiclesScreen;
export { selectViewVehiclesScreenDomain };
