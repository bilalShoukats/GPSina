/**
 *
 * Asynchronously loads the component for Crm
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('.'));
