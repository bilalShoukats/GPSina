/**
 *
 * Asynchronously loads the component for GridDemo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
