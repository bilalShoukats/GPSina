/*
 * DeviceDetailPage Messages
 *
 * This contains all the text for the DeviceDetailPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DeviceDetailPage';

export default defineMessages({
    addDevice: {
        id: `${scope}.addDevice`,
        defaultMessage: 'Device Info',
    },
    deviceInformation: {
        id: `${scope}.deviceInformation`,
        defaultMessage: 'Device Information',
    },
    softwareVersion: {
        id: `${scope}.softwareVersion`,
        defaultMessage: 'Software Version',
    },
    trackerNumber: {
        id: `${scope}.trackerNumber`,
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
