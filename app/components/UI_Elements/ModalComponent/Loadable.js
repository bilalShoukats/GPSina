/**
 *
 * Asynchronously loads the component for ModalComponent
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
