/*
 * VehiclePage Messages
 *
 * This contains all the text for the VehiclePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.VehiclePage';

export default defineMessages({
    vehicle: {
        id: `${scope}.vehicle`,
        defaultMessage: 'Vehicle',
    },
    vehicleId: {
        id: `${scope}.vehicleId`,
        defaultMessage: 'vehicle ID',
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
