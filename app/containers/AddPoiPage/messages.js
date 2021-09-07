/*
 * AddPoiPage Messages
 *
 * This contains all the text for the AddPoiPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AddPoiPage';

export default defineMessages({
  newPoi: {
    id: `${scope}.newPoi`,
    defaultMessage: 'New Point of Interest',
  },
  poiName: {
    id: `${scope}.poiName`,
    defaultMessage: 'POI Name',
  },
  enterPoiName: {
    id: `${scope}.enterPoiName`,
    defaultMessage: 'Enter POI Name',
  },
  latitude: {
    id: `${scope}.latitude`,
    defaultMessage: 'Latitude',
  },
  enterLatitude: {
    id: `${scope}.enterLatitude`,
    defaultMessage: 'Enter latitude',
  },
  longitude: {
    id: `${scope}.longitude`,
    defaultMessage: 'Longitude',
  },
  enterLongitude: {
    id: `${scope}.enterLongitude`,
    defaultMessage: 'Enter longitude',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  enterAddress: {
    id: `${scope}.enterAddress`,
    defaultMessage: 'Enter Address',
  },
  zone: {
    id: `${scope}.zone`,
    defaultMessage: 'Zone',
  },
  enterZone: {
    id: `${scope}.enterZone`,
    defaultMessage: 'Enter Zone',
  },
  color: {
    id: `${scope}.color`,
    defaultMessage: 'Color',
  },
  markerShop: {
    id: `${scope}.markerShop`,
    defaultMessage: 'Marker Shop',
  },
  save:{
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
});
