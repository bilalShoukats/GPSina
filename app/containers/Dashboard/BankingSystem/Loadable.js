/**
 *
 * Asynchronously loads the component for BankingSystem
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
