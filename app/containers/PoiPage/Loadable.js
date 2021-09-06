/**
 *
 * Asynchronously loads the component for PoiPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
