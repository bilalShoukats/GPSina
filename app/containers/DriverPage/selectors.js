import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the driverPage state domain
 */

const selectDriver = state => state.driver || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DriverPage
 */

const makeSelectDriver = () =>
  createSelector(
    selectDriver,
    driver => driver.driver,
  );

export default makeSelectDriver;
export { selectDriver };
