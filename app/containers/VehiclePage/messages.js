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
    assignDriver: {
        id: `${scope}.assignDriver`,
        defaultMessage: 'Assign Driver',
    },
    unassignDriver: {
        id: `${scope}.unassignDriver`,
        defaultMessage: 'Un-assign Driver',
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
