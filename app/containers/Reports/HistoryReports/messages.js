/*
 * HistoryReports Messages
 *
 * This contains all the text for the HistoryReports container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ContactUsPage';

export default defineMessages({
    history: {
        id: `${scope}.history`,
        defaultMessage: 'History Reports',
    },
    Name: {
        id: `${scope}.Name`,
        defaultMessage: 'Name',
    },
    date: {
        id: `${scope}.date`,
        defaultMessage: 'Date',
    },
    Speed: {
        id: `${scope}.Speed`,
        defaultMessage: 'Speed',
    },
    latlng: {
        id: `${scope}.latlng`,
        defaultMessage: 'Lat/Lng',
    },
    positioning: {
        id: `${scope}.positioning`,
        defaultMessage: 'Positioning',
    },
    call: {
        id: `${scope}.call`,
        defaultMessage: 'Call',
    },
    smsWhatsapp: {
        id: `${scope}.smsWhatsapp`,
        defaultMessage: 'SMS / WhatsApp',
    },
    wechat: {
        id: `${scope}.wechat`,
        defaultMessage: 'WeChat',
    },
    wechatId: {
        id: `${scope}.wechatId`,
        defaultMessage: 'GPSINACS',
    },
    companyAddress: {
        id: `${scope}.companyAddress`,
        defaultMessage: 'Company Address',
    },
    activationService: {
        id: `${scope}.activationService`,
        defaultMessage: 'Activation service',
    },
    workingHour: {
        id: `${scope}.workingHour`,
        defaultMessage: 'Monday - Sunday, 9 am - 7 pm',
    },
    lunchHour: {
        id: `${scope}.lunchHour`,
        defaultMessage: 'Lunch break: 12.30 pm - 1.30 pm',
    },
});
