/*
 * FencePage Messages
 *
 * This contains all the text for the FencePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FencePage';

export default defineMessages({
  fence: {
    id: `${scope}.fence`,
    defaultMessage: 'Fence',
  },
  seeAllFence: {
    id: `${scope}.seeAllFence`,
    defaultMessage: 'See All Fence',
  },
  fenceName: {
    id: `${scope}.fenceName`,
    defaultMessage: 'Fence name',
  }
});
