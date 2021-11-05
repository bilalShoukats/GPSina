/*
 * AddZonePage Messages
 *
 * This contains all the text for the AddZonePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AddZonePage';

export default defineMessages({
    addZone: {
        id: `${scope}.addZone`,
        defaultMessage: 'Add Delivery Area',
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
