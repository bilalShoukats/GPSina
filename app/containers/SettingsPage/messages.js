/*
 * SettingsPage Messages
 *
 * This contains all the text for the SettingsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SettingsPage';

export default defineMessages({
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'User name',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  mobile: {
    id: `${scope}.mobile`,
    defaultMessage: 'mobile',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Change Password',
  },
  oldPassword: {
    id: `${scope}.oldPassword`,
    defaultMessage: 'Old Password',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'New password',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  contactUs: {
    id: `${scope}.contactUs`,
    defaultMessage: 'Contact us',
  },
  refundDeliveryMethod: {
    id: `${scope}.refundDeliveryMethod`,
    defaultMessage: 'Refund & Delivery Method',
  },
  expiredDevices: {
    id: `${scope}.expiredDevices`,
    defaultMessage: 'Expired Devices',
  },
  logOut: {
    id: `${scope}.logOut`,
    defaultMessage: 'Log out',
  },
});
