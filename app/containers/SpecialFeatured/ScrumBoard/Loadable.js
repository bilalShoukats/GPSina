/**
 *
 * Asynchronously loads the component for ScrumBoard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
