/*
 * AlertPage Messages
 *
 * This contains all the text for the AlertPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AlertPage';

export default defineMessages({
  noAlertFound: {
    id: `${scope}.noAlertFound`,
    defaultMessage: 'No Notifications Found',
  },
});
