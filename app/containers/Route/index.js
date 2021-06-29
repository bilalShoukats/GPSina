/**
 *
 * Route
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import PublicRoute from '../../components/PublicRoute';
import PrivateRoute from '../../components/PrivateRoute';

import SCREENS from '../../constants/screen';

// SCREENS/PAGE
import LoginPage from '../LoginPage/Loadable';
import ForgotPasswordPage from '../ForgotPasswordPage/Loadable';
import ResetPasswordPage from '../ResetPasswordPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import HomePage from '../HomePage/Loadable';
import AlertPage from '../AlertPage/Loadable';
import SettingsPage from '../SettingsPage/Loadable';

export function Route() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isRestricted, setIsRestricted] = useState(false);

  const login = () => {
    setIsLoggedIn(prevState => !prevState);
  };
  const restricted = () => {
    setIsRestricted(prevState => !prevState);
  };

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
export default Route;
