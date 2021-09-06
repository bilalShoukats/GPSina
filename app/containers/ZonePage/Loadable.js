/**
 *
 * Asynchronously loads the component for ZonePage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
