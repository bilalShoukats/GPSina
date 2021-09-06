/**
 *
 * Route
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import HomePage from '../HomePage/Loadable';
import SCREENS from '../../constants/screen';
import AlertPage from '../AlertPage/Loadable';
import GensetPage from '../GensetPage/Loadable';
import AddGensetPage from '../AddGensetPage/Loadable';
import GensetDetailPage from '../GensetDetailPage/Loadable';
import DriverPage from '../DriverPage/Loadable';
import AddDriverPage from '../AddDriverPage/Loadable';
import DriverDetailPage from '../DriverDetailPage/Loadable';
import POIPage from '../POIPage/Loadable';
import ZonePage from '../ZonePage/Loadable';
import AddZonePage from '../AddZonePage/Loadable';
import FencePage from '../FencePage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import LocatePage from '../LocatePage/Loadable';
import HistoryPage from '../HistoryPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import SettingsPage from '../SettingsPage/Loadable';
import ContactUsPage from '../ContactUsPage/Loadable';
import PublicRoute from '../../components/PublicRoute';
import SelectDatePage from '../SelectDatePage/Loadable';
import PrivateRoute from '../../components/PrivateRoute';
import ResetPasswordPage from '../ResetPasswordPage/Loadable';
import ExpiredDevicePage from '../ExpiredDevicePage/Loadable';
import RefundDeliveryPage from '../RefundDeliveryPage/Loadable';
import ForgotPasswordPage from '../ForgotPasswordPage/Loadable';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

export function Route(props) {
    return (
        <Router>
            <Switch>
                {/* Public Route that can be accessed without token, not restricted screen */}
                <PublicRoute
                    exact
                    path={SCREENS.LOGIN}
                    component={LoginPage}
                    restricted={props.isAuthenticated}
                />
                <PublicRoute
                    exact
                    path={SCREENS.FORGOTPASSWORD}
                    component={ForgotPasswordPage}
                    restricted={props.isAuthenticated}
                />
                <PublicRoute
                    exact
                    path={SCREENS.RESETPASSWORD}
                    component={ResetPasswordPage}
                    restricted={props.isAuthenticated}
                />
                <PublicRoute
                    exact
                    path={SCREENS.NOTFOUND}
                    component={NotFoundPage}
                    restricted={props.isAuthenticated}
                />

                {/* Private Route, restricted screen that required token to access */}
                <PrivateRoute
                    exact
                    path="/"
                    component={HomePage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path={SCREENS.ALERT}
                    component={AlertPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path={SCREENS.SETTINGS}
                    component={SettingsPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path={SCREENS.CONTACTUS}
                    component={ContactUsPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path={SCREENS.REFUNDDELIVERY}
                    component={RefundDeliveryPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path={SCREENS.EXPIREDDEVICES}
                    component={ExpiredDevicePage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path={SCREENS.FENCE}
                    component={FencePage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path={SCREENS.LOCATE}
                    component={LocatePage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path={SCREENS.HISTORY}
                    component={HistoryPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path={SCREENS.SELECTDATE}
                    component={SelectDatePage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact 
                    path={SCREENS.GENSET} 
                    component={GensetPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute 
                    exact
                    path={SCREENS.ADDGENSET} 
                    component={AddGensetPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute 
                    exact 
                    path={SCREENS.GENSETDETAIL} 
                    component={GensetDetailPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact 
                    path={SCREENS.DRIVER} 
                    component={DriverPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute 
                    exact
                    path={SCREENS.ADDDRIVER} 
                    component={AddDriverPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute 
                    exact 
                    path={SCREENS.DRIVERDETAIL} 
                    component={DriverDetailPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact 
                    path={SCREENS.POI} 
                    component={POIPage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact 
                    path={SCREENS.ZONE} 
                    component={ZonePage}
                    isAuthenticated={props.isAuthenticated}
                />
                <PrivateRoute
                    exact 
                    path={SCREENS.ADDZONE} 
                    component={AddZonePage}
                    isAuthenticated={props.isAuthenticated}
                />

                {/* If url doesn't exist, redirect to 404 */}
                <Redirect to={SCREENS.NOTFOUND} />
            </Switch>
        </Router>
    );
}

const mapStateToProps = state => {
    const { auth } = state;
    console.log('LoginAuth: ', auth);
    return { isAuthenticated: auth.token && auth.user ? true : false };
};
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Route);
