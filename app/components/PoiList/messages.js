/*
 * PoiList Messages
 *
 * This contains all the text for the PoiList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.PoiList';

export default defineMessages({
    name: {
        id: `${scope}.name`,
        defaultMessage: 'name :',
    },
    type: {
        id: `${scope}.type`,
        defaultMessage: 'type : ',
    },
    zone: {
        id: `${scope}.zone`,
        defaultMessage: 'zone : ',
    },
    address: {
        id: `${scope}.address`,
        defaultMessage: 'address : ',
    },
});
