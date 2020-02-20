/**
 *
 * Asynchronously loads the component for ChartJsComponent
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
