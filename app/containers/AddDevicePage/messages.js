/*
 * AddDevicePage Messages
 *
 * This contains all the text for the AddDevicePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AddDevicePage';

export default defineMessages({
    addDevice: {
        id: `${scope}.addDevice`,
        defaultMessage: 'Add Device',
    },
    deviceInformation: {
        id: `${scope}.deviceInformation`,
        defaultMessage: 'Device Information',
    },
    softwareVersion: {
        id: `${scope}.softwareVersion`,
        defaultMessage: 'Software Version',
    },
    trakerNumber: {
        id: `${scope}.trakerNumber`,
        defaultMessage: 'Traker Number',
    },
    activeDevice: {
        id: `${scope}.activeDevice`,
        defaultMessage: 'Active Device',
    },
    enterSoftware: {
        id: `${scope}.enterSoftware`,
        defaultMessage: 'Enter Software Version',
    },
    enterTraker: {
        id: `${scope}.enterTraker`,
        defaultMessage: 'Enter Traker Number',
    },
    atLeast5Character: {
        id: `${scope}.atLeast5Character`,
        defaultMessage: 'must at least 5 characters',
    },
    validRegEx: {
        id: `${scope}.validRegEx`,
        defaultMessage: 'Pattern not matches (0.0.0)',
    },
    submit: {
        id: `${scope}.submit`,
        defaultMessage: 'Submit',
    },
});
