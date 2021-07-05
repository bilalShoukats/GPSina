/**
 *
 * Asynchronously loads the component for FencePage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
