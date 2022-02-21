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
    trackerNumber: {
        id: `${scope}.trackerNumber`,
        defaultMessage: 'Tracker Number',
    },
    activeDevice: {
        id: `${scope}.activeDevice`,
        defaultMessage: 'Active Device',
    },
    enterSoftware: {
        id: `${scope}.enterSoftware`,
        defaultMessage: 'Enter Software Version',
    },
    enterTracker: {
        id: `${scope}.enterTracker`,
        defaultMessage: 'Enter Tracker Number',
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
    generalError: {
        id: `${scope}.generalError`,
        defaultMessage: 'Error',
    },
    notSuccess: {
        id: `${scope}.notSuccess`,
        defaultMessage: 'Add device not successful',
    }
});
