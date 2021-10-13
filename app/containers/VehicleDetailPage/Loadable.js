/**
 *
 * Asynchronously loads the component for VehicleDetailPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
