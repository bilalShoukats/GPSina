/*
 * AddGensetPage Messages
 *
 * This contains all the text for the AddGensetPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AddGensetPage';

export default defineMessages({
  addGenset: {
    id: `${scope}.addGenset`,
    defaultMessage: 'Add New Genset',
  },
  deviceId: {
    id: `${scope}.deviceId`,
    defaultMessage: 'Device ID',
  },
  enterDeviceId: {
    id: `${scope}.enterDeviceId`,
    defaultMessage: 'Enter Device ID',
  },
  deviceName: {
    id: `${scope}.deviceName`,
    defaultMessage: 'Device Name',
  },
  enterDeviceName: {
    id: `${scope}.enterDeviceName`,
    defaultMessage: 'Enter Device Name',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Submit',
  },
});
