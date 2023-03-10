/*
 * HistoryPage Messages
 *
 * This contains all the text for the HistoryPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HistoryPage';

export default defineMessages({
  history: {
    id: `${scope}.history`,
    defaultMessage: 'History',
  },
  from: {
    id: `${scope}.from`,
    defaultMessage: 'from',
  },
  to: {
    id: `${scope}.to`,
    defaultMessage: 'to',
  },
});
