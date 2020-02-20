/**
 *
 * Asynchronously loads the component for Alerts
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
