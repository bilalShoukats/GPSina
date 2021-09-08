/**
 *
 * Asynchronously loads the component for PoiDetailPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
