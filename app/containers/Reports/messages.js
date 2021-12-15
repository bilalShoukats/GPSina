/*
 * Reports Messages
 *
 * This contains all the text for the Reports container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Reports';

export default defineMessages({
    Header: {
        id: `${scope}.header`,
        defaultMessage: 'Reports',
    },
    HistoryReport: {
        id: `${scope}.history Reports`,
        defaultMessage: 'History Reports',
    },
    AlarmReport: {
        id: `${scope}.alarm Reports`,
        defaultMessage: 'Alarm Reports',
    },
    IdlingReport: {
        id: `${scope}.IdlingReport`,
        defaultMessage: 'Idling Reports',
    },
    IgnitionReport: {
        id: `${scope}.IgnitionReport`,
        defaultMessage: 'Ignition Reports',
    },
});
