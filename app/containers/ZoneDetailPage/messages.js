/*
 * ZoneDetailPage Messages
 *
 * This contains all the text for the ZoneDetailPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ZoneDetailPage';

export default defineMessages({
    zoneDetails: {
        id: `${scope}.zoneDetails`,
        defaultMessage: 'Zone Details',
    },
    zoneInformation: {
        id: `${scope}.zoneInformation`,
        defaultMessage: 'Zone Info',
    },
    deliveryArea: {
        id: `${scope}.deliveryArea`,
        defaultMessage: 'Delivery Area',
    },
    enterDeliveryArea: {
        id: `${scope}.enterDeliveryArea`,
        defaultMessage: 'Enter Delivery Area',
    },
    submit: {
        id: `${scope}.submit`,
        defaultMessage: 'Submit',
    },
});
