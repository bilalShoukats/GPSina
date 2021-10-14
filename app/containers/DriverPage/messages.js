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
    deleteDriver: {
        id: `${scope}.deleteDriver`,
        defaultMessage: 'Delete Driver',
    },
    expiredOn: {
        id: `${scope}.expiredOn`,
        defaultMessage: 'Expired on ',
    },
});
