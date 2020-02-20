import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bankingSystem state domain
 */

const selectBankingSystemDomain = state => state.bankingSystem || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BankingSystem
 */

const makeSelectBankingSystem = () =>
  createSelector(
    selectBankingSystemDomain,
    substate => substate,
  );

export default makeSelectBankingSystem;
export { selectBankingSystemDomain };
