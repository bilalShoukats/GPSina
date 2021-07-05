/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import SCREENS from '../../constants/screen';
import { SuperHOC } from '../../HOC';

const propTypes = {
  component: PropTypes.func.isRequired,
  redirect: PropTypes.string,
};

const defaultProps = {
  restricted: false,
  redirect: SCREENS.LOGIN,
};

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  redirect: pathname,
  ...rest
}) => (
  rest.apiManager.token != '' ? 
    <Route
      {...rest}
      render={props =>  <Component {...props} /> } 
    />
    :
    <Redirect to={{ pathname }} />
);

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;

export default SuperHOC(PrivateRoute);
