/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.HomePage';

export default defineMessages({
  addDevice: {
    id: `${scope}.tryme.addDevice`,
    defaultMessage: 'Add Device',
  },
  vehicleNo: {
    id: `${scope}.tryme.vehicleNo`,
    defaultMessage: 'Vehicle No',
  },
  trackerNo: {
    id: `${scope}.tryme.trackerNo`,
    defaultMessage: 'Tracker No',
  },
  search: {
    id: `${scope}.tryme.search`,
    defaultMessage: 'Search',
  },
  status: {
    id: `${scope}.tryme.status`,
    defaultMessage: 'Status',
  },
  home: {
    id: `${scope}.tryme.home`,
    defaultMessage: 'Home',
  },
});
