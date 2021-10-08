/*
 * DevicePage Messages
 *
 * This contains all the text for the DevicePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DevicePage';

export default defineMessages({
    device: {
        id: `${scope}.device`,
        defaultMessage: 'Device',
    },
    deviceId: {
        id: `${scope}.deviceId`,
        defaultMessage: 'Device ID',
    },
    assignVehicle: {
        id: `${scope}.assignVehicle`,
        defaultMessage: 'Assign Vehicle',
    },
    unassignVehicle: {
        id: `${scope}.unassignVehicle`,
        defaultMessage: 'Un-assign Vehicle',
    },
    unavailableVehicle: {
        id: `${scope}.unavailableVehicle`,
        defaultMessage: 'Un-available Vehicle',
    },
    deleteVehicle: {
        id: `${scope}.deleteVehicle`,
        defaultMessage: 'Delete Vehicle',
    },
});
