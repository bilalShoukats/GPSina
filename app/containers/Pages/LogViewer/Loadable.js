/**
 *
 * Asynchronously loads the component for LogViewer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
