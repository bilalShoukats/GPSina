/**
 *
 * Route
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
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
import SettingsPage from '../SettingsPage/Loadable';
import ContactUsPage from '../ContactUsPage/Loadable';
import RefundDeliveryPage from '../RefundDeliveryPage/Loadable';
import ExpiredDevicePage from '../ExpiredDevicePage/Loadable';

export function Route(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRestricted, setIsRestricted] = useState(true);

  const history = useHistory();

  useEffect(() => {
    console.log('useEffect Route');
    console.log('props.apiManager.token', props.apiManager.token);
    if (props.apiManager.token == '') {
      console.log('Set login and restricted to default');
      setIsLoggedIn(false);
      setIsRestricted(true);
      history.push(SCREENS.LOGIN);
    } else {
      console.log('allow login and disable restriction on certain screen');
      if(!isLoggedIn){
        setIsLoggedIn(true);
      }
      if(isRestricted){
        setIsRestricted(false);
      }
    }
  }, []);

  return (
    <Router>
      <Switch>
        {/* Public Route that can be accessed without token, not restricted screen */}
        <PublicRoute exact path={SCREENS.LOGIN} component={LoginPage} />
        <PublicRoute
          exact
          path={SCREENS.FORGOTPASSWORD}
          component={ForgotPasswordPage}
        />
        <PublicRoute
          exact
          path={SCREENS.RESETPASSWORD}
          component={ResetPasswordPage}
        />
        <PublicRoute exact path={SCREENS.NOTFOUND} component={NotFoundPage} />

        {/* Private Route, restricted screen that required token to access */}
        <PrivateRoute
          exact
          path="/"
          isAuthenticated={isLoggedIn}
          restricted={isRestricted}
          component={HomePage}
        />
        <PrivateRoute
          exact
          path={SCREENS.ALERT}
          isAuthenticated={isLoggedIn}
          restricted={isRestricted}
          component={AlertPage}
        />
        <PrivateRoute
          exact
          path={SCREENS.SETTINGS}
          isAuthenticated={isLoggedIn}
          restricted={isRestricted}
          component={SettingsPage}
        />
        <PrivateRoute
          exact
          path={SCREENS.CONTACTUS}
          isAuthenticated={isLoggedIn}
          restricted={isRestricted}
          component={ContactUsPage}
        />
        <PrivateRoute
          exact
          path={SCREENS.REFUNDDELIVERY}
          isAuthenticated={isLoggedIn}
          restricted={isRestricted}
          component={RefundDeliveryPage}
        />
        <PrivateRoute
          exact
          path={SCREENS.EXPIREDDEVICES}
          isAuthenticated={isLoggedIn}
          restricted={isRestricted}
          component={ExpiredDevicePage}
        />

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
