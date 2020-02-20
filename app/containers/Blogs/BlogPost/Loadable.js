/**
 *
 * Asynchronously loads the component for BlogPost
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
