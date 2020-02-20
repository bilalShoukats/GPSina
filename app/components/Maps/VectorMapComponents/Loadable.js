/**
 *
 * Asynchronously loads the component for VectorMapComponents
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
