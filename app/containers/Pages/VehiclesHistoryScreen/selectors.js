import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the vehiclesHistoryScreen state domain
 */

const selectVehiclesHistoryScreenDomain = state => state.vehiclesHistoryScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VehiclesHistoryScreen
 */

const makeSelectVehiclesHistoryScreen = () =>
  createSelector(
    selectVehiclesHistoryScreenDomain,
    substate => substate,
  );

export default makeSelectVehiclesHistoryScreen;
export { selectVehiclesHistoryScreenDomain };
