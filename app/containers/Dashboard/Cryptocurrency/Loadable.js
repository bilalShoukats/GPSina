/**
 *
 * Asynchronously loads the component for Cryptocurrency
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
