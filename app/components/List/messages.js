/*
 * DeviceList Messages
 *
 * This contains all the text for the DeviceList component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.DeviceList';

export default defineMessages({
  accOff: {
    id: `${scope}.accOff`,
    defaultMessage: 'acc off',
  },
  accOn: {
    id: `${scope}.accOn`,
    defaultMessage: 'acc On',
  },
  locate: {
    id: `${scope}.locate`,
    defaultMessage: 'Locate',
  },
  fence: {
    id: `${scope}.fence`,
    defaultMessage: 'fence',
  },
  history: {
    id: `${scope}.history`,
    defaultMessage: 'history',
  },
  more: {
    id: `${scope}.more`,
    defaultMessage: 'more ...',
  },
  alert: {
    id: `${scope}.alert`,
    defaultMessage: 'alert',
  },
});
