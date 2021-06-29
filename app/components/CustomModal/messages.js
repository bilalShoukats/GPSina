/*
 * CustomModal Messages
 *
 * This contains all the text for the CustomModal component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.CustomModal';

export default defineMessages({
  expired: {
    id: `${scope}.expired`,
    defaultMessage:
      'This Device has been expired, Kindly contact to our office for more info!',
  },
  fenceNotSet: {
    id: `${scope}.fenceNotSet`,
    defaultMessage: 'Please set fence',
  },
  deleteFence: {
    id: `${scope}.deleteFence`,
    defaultMessage: 'Delete Fence',
  },
  confirmDeleteFence: {
    id: `${scope}.confirmDeleteFence`,
    defaultMessage: 'Confirm Delete Fence',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Modal title',
  },
  ok: {
    id: `${scope}.ok`,
    defaultMessage: 'ok',
  },
  moreSettings: {
    id: `${scope}.moreSettings`,
    defaultMessage: 'more settings - ',
  },
  vibrate: {
    id: `${scope}.vibrate`,
    defaultMessage: 'vibrate',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'save',
  },
  go: {
    id: `${scope}.go`,
    defaultMessage: 'go',
  },
  regNo: {
    id: `${scope}.regNo`,
    defaultMessage: 'reg no',
  },
  speed: {
    id: `${scope}.speed`,
    defaultMessage: 'speed',
  },
  sharedDevices: {
    id: `${scope}.sharedDevices`,
    defaultMessage: 'shared devices',
  },
  pushNotificationSettings: {
    id: `${scope}.pushNotificationSettings`,
    defaultMessage: 'push notification settings',
  },
});
