import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addVehicleScreen state domain
 */

const selectAddVehicleScreenDomain = state => state.addVehicleScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddVehicleScreen
 */

const makeSelectAddVehicleScreen = () =>
  createSelector(
    selectAddVehicleScreenDomain,
    substate => substate,
  );

export default makeSelectAddVehicleScreen;
export { selectAddVehicleScreenDomain };
