/*
 * ContactUsPage Messages
 *
 * This contains all the text for the ContactUsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ContactUsPage';

export default defineMessages({
    Ignition: {
        id: `${scope}.Ignition`,
        defaultMessage: 'Ignition Reports',
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
