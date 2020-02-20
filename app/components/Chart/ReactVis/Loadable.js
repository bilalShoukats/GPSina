/**
 *
 * Asynchronously loads the component for ReactVis
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
