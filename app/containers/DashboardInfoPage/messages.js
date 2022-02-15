/*
 * DashboardInfoPage Messages
 *
 * This contains all the text for the DashboardInfoPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DashboardInfoPage';

export default defineMessages({
    dashboardInfo: {
        id: `${scope}.dashboardInfo`,
        defaultMessage: 'Dashboard Information',
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
    vehicles: {
        id: `${scope}.vehicles`,
        defaultMessage: 'VEHICLES',
    },
    drivers: {
        id: `${scope}.drivers`,
        defaultMessage: 'DRIVERS',
    },
    poi: {
        id: `${scope}.poi`,
        defaultMessage: 'POI',
    },
    zone: {
        id: `${scope}.zone`,
        defaultMessage: 'ZONE',
    },
    online: {
        id: `${scope}.online`,
        defaultMessage: 'Online',
    },
    offline: {
        id: `${scope}.offline`,
        defaultMessage: 'Offline',
    },
    expired: {
        id: `${scope}.expired`,
        defaultMessage: 'Expired',
    },
    available: {
        id: `${scope}.available`,
        defaultMessage: 'Available',
    },
    unavailable: {
        id: `${scope}.unavailable`,
        defaultMessage: 'Unavailable',
    },
    private: {
        id: `${scope}.private`,
        defaultMessage: 'Private',
    },
    business: {
        id: `${scope}.business`,
        defaultMessage: 'Business',
    },
    total: {
        id: `${scope}.total`,
        defaultMessage: 'Total',
    }
});
