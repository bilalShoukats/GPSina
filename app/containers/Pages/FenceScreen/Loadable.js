/**
 *
 * Asynchronously loads the component for FenceScreen
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
