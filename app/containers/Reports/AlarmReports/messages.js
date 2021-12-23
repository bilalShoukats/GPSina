/*
 * AlarmRepots Messages
 *
 * This contains all the text for the AlarmRepots container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ContactUsPage';

export default defineMessages({
    Alarm: {
        id: `${scope}.Alarm`,
        defaultMessage: 'Alarm Reports',
    },
    Name: {
        id: `${scope}.Name`,
        defaultMessage: 'Name',
    },
    date: {
        id: `${scope}.date`,
        defaultMessage: 'Date',
    },
    Speed: {
        id: `${scope}.Speed`,
        defaultMessage: 'Speed',
    },
    latlng: {
        id: `${scope}.latlng`,
        defaultMessage: 'Lat/Lng',
    },
    positioning: {
        id: `${scope}.positioning`,
        defaultMessage: 'Positioning',
    },
});
