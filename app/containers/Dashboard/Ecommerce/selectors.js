import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ecommerce state domain
 */

const selectEcommerceDomain = state => state.ecommerce || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Ecommerce
 */

const makeSelectEcommerce = () =>
  createSelector(
    selectEcommerceDomain,
    substate => substate,
  );

export default makeSelectEcommerce;
export { selectEcommerceDomain };
