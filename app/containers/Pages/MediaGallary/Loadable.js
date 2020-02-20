/**
 *
 * Asynchronously loads the component for MediaGallary
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
