/*
 * PoiPage Messages
 *
 * This contains all the text for the PoiPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PoiPage';

export default defineMessages({
  poi: {
    id: `${scope}.poi`,
    defaultMessage: 'Point of Interest',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'name',
  },
  type: {
    id: `${scope}.type`,
    defaultMessage: 'type',
  },
  zone: {
    id: `${scope}.zone`,
    defaultMessage: 'zone',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'address',
  },
});
