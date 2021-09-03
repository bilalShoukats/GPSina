/*
 * RefundDeliveryPage Messages
 *
 * This contains all the text for the RefundDeliveryPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RefundDeliveryPage';

export default defineMessages({
  refundDelivery: {
    id: `${scope}.refundDelivery`,
    defaultMessage: 'Refund & delivery method',
  },
  refundPolicy: {
    id: `${scope}.refundPolicy`,
    defaultMessage: 'Refund Policy',
  },
  refundPolicyDescription: {
    id: `${scope}.refundPolicyDescription`,
    defaultMessage: 'GPSina products are sold at a fixed price and we do not support refund. If your product is found to be defected or not working in any scenario it will be replaced by a new product. We do not offer any kind of cash in case of returns',
  },
  simRenewal: {
    id: `${scope}.simRenewal`,
    defaultMessage: 'Sim Renewal',
  },
  simRenewalDescription: {
    id: `${scope}.simRenewalDescription`,
    defaultMessage: "All GPSina products come with a pre-installed SIM card that has to be renewed yearly with a fixed yearly fee. You can renew sim directly through the app's sim renewal link in profile or by calling the Customer Care Center at GPSina. For more information please visit our website.",
  },
  deliveryMethod: {
    id: `${scope}.deliveryMethod`,
    defaultMessage: 'Delivery Method',
  },
  deliveryMethodDescription: {
    id: `${scope}.deliveryMethodDescription`,
    defaultMessage: 'Your GPSina product can be obtained in two ways',
  },
  dealerOutletInstallation: {
    id: `${scope}.dealerOutletInstallation`,
    defaultMessage: '1- Installation at a dealer outlet:',
  },
  dealerOutletInstallationDescription: {
    id: `${scope}.dealerOutletInstallationDescription`,
    defaultMessage: 'You can choose to go to your nearest outlet to get the GPSina tracker installed in your car. For a list of distributors please visit our website.',
  },
  homeInstallation: {
    id: `${scope}.homeInstallation`,
    defaultMessage: '2- Installation at your home:',
  },
  homeInstallationDescription: {
    id: `${scope}.homeInstallationDescription`,
    defaultMessage: 'You can call directly to GPSina contact number and get the tracker installed at your doorstep. For more information please visit our website',
  },
  websiteLink: {
    id: `${scope}.websiteLink`,
    defaultMessage: 'Website Link',
  },
});
