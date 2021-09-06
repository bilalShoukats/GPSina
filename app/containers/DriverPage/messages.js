/*
 * DriverPage Messages
 *
 * This contains all the text for the DriverPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DriverPage';

export default defineMessages({
  driver: {
    id: `${scope}.driver`,
    defaultMessage: 'Driver',
  },
  driverId: {
    id: `${scope}.driverId`,
    defaultMessage: 'Driver ID',
  },
  expiredOn: {
    id: `${scope}.expiredOn`,
    defaultMessage: 'Expired on ',
  },
});
