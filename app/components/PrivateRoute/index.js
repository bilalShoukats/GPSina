/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SCREENS from '../../constants/screen';
import { Route, Redirect } from 'react-router-dom';

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
}) =>
    isAuthenticated ? (
        <Route {...rest} render={props => <Component {...props} />} />
    ) : (
        <Redirect to={{ pathname }} />
    );

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;

export default PrivateRoute;
