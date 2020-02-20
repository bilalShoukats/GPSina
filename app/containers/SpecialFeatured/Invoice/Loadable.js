/**
 *
 * Asynchronously loads the component for Invoice
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
