/*
 * SelectDatePage Messages
 *
 * This contains all the text for the SelectDatePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SelectDatePage';

export default defineMessages({
  selectDate: {
    id: `${scope}.selectDate`,
    defaultMessage: 'Select Date',
  },
  noDateFound: {
    id: `${scope}.noDateFound`,
    defaultMessage: 'No Date Found',
  },
});
