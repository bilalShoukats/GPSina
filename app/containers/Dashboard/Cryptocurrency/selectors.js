import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cryptocurrency state domain
 */

const selectCryptocurrencyDomain = state =>
  state.cryptocurrency || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Cryptocurrency
 */

const makeSelectCryptocurrency = () =>
  createSelector(
    selectCryptocurrencyDomain,
    substate => substate,
  );

export default makeSelectCryptocurrency;
export { selectCryptocurrencyDomain };
