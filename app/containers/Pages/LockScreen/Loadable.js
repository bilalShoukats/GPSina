/**
 *
 * Asynchronously loads the component for LockScreen
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
