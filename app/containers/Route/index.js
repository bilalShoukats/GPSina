/**
 *
 * Route
 *
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, useHistory } from 'react-router-dom';

import PublicRoute from '../../components/PublicRoute';
import PrivateRoute from '../../components/PrivateRoute';

import SCREENS from '../../constants/screen';
import { SuperHOC } from '../../HOC';

// SCREENS/PAGE
import LoginPage from '../LoginPage/Loadable';
import ForgotPasswordPage from '../ForgotPasswordPage/Loadable';
import ResetPasswordPage from '../ResetPasswordPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import HomePage from '../HomePage/Loadable';
import AlertPage from '../AlertPage/Loadable';
import GensetPage from '../GensetPage/Loadable';
import AddGensetPage from '../AddGensetPage/Loadable';
import GensetDetailPage from '../GensetDetailPage/Loadable';
import SettingsPage from '../SettingsPage/Loadable';
import ContactUsPage from '../ContactUsPage/Loadable';
import RefundDeliveryPage from '../RefundDeliveryPage/Loadable';
import ExpiredDevicePage from '../ExpiredDevicePage/Loadable';
import FencePage from '../FencePage/Loadable';
import LocatePage from '../LocatePage/Loadable';
import HistoryPage from '../HistoryPage/Loadable';
import SelectDatePage from '../SelectDatePage/Loadable';

export function Route() {

  return (
    <Router>
      <Switch>
        {/* Public Route that can be accessed without token, not restricted screen */}
        <PublicRoute exact path={SCREENS.LOGIN} component={LoginPage} />
        <PublicRoute exact path={SCREENS.FORGOTPASSWORD} component={ForgotPasswordPage} />
        <PublicRoute exact path={SCREENS.RESETPASSWORD} component={ResetPasswordPage} />
        <PublicRoute exact path={SCREENS.NOTFOUND} component={NotFoundPage} />

        {/* Private Route, restricted screen that required token to access */}
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path={SCREENS.ALERT} component={AlertPage}/>
        <PrivateRoute exact path={SCREENS.GENSET} component={GensetPage}/>
        <PrivateRoute exact path={SCREENS.ADDGENSET} component={AddGensetPage}/>
        <PrivateRoute exact path={SCREENS.GENSETDETAIL} component={GensetDetailPage}/>
        <PrivateRoute exact path={SCREENS.SETTINGS} component={SettingsPage} />
        <PrivateRoute exact path={SCREENS.CONTACTUS} component={ContactUsPage} />
        <PrivateRoute exact path={SCREENS.REFUNDDELIVERY} component={RefundDeliveryPage} />
        <PrivateRoute exact path={SCREENS.EXPIREDDEVICES} component={ExpiredDevicePage} />
        <PrivateRoute exact path={SCREENS.FENCE} component={FencePage} />
        <PrivateRoute exact path={SCREENS.LOCATE} component={LocatePage} />
        <PrivateRoute exact path={SCREENS.HISTORY} component={HistoryPage} />
        <PrivateRoute exact path={SCREENS.SELECTDATE} component={SelectDatePage} />

        {/* If url doesn't exist, redirect to 404 */}
        <Redirect to={SCREENS.NOTFOUND} />
      </Switch>
    </Router>
  );
}

// Route.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   null,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(Route);
export default SuperHOC(Route);
