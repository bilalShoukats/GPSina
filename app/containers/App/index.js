/**
 *
 * App
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Route from 'containers/Route/Loadable';
import GlobalStyle from '../../global-styles';
import ApiManager from '../../ApiManager/ApiManager';
import { Manager } from '../../StorageManager/Storage';
import {
    setSession,
    loginUserSuccess,
    changeLoading,
} from '../../redux/auth/actions';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './styles.js';
import { Sentry } from 'react-activity';
import "react-activity/dist/library.css";
import Config from '../../constants/config';

function App(props) {
    let api = ApiManager.getInstance();

    const classes = useStyles(props);

    React.useEffect(() => {
        if (props.token === null) {
            Manager.getItem('token', true)
                .then(token => {
                    if (token !== null && token !== '') {
                        Manager.getItem('user', true)
                            .then(user => {
                                if (user !== null && user !== '') {
                                    api.setToken(user.email, token);
                                    props.dispatch(
                                        loginUserSuccess(token, user),
                                    );
                                }
                            })
                            .catch(error => console.log(error));
                    }
                })
                .catch(error => console.log(error));
        }
    }, []);

    React.useEffect(() => {
        Manager.getItem('sessionId', true)
            .then(sessionId => {
                if (sessionId != null && sessionId != '') {
                    api.setSession(sessionId);
                    props.dispatch(setSession(sessionId));
                    props.dispatch(changeLoading(false));
                    // api.send('POST', '/updateSession', {
                    //     fcmKey: '123',
                    //     sessionId: sessionId,
                    // })
                    //     .then(response => {
                    //         if (response.data.code === 1014) {
                    //             api.setSession(sessionId);
                    //             props.dispatch(setSession(sessionId));
                    //             props.dispatch(changeLoading(false));
                    //         }
                    //     })
                    //     .catch(error =>
                    //         console.log('session create error: ', error),
                    //     );
                } else {
                    api.send('PUT', '/createSession', { fcmKey: '123',appID:Config.appID })
                        .then(response => {
                            console.log("what is create  session api response: ", response);
                            api.setSession(response.data.response.sessionId);
                            props.dispatch(
                                setSession(response.data.response.sessionId),
                            );
                            props.dispatch(changeLoading(false));
                            Manager.setItem(
                                'sessionId',
                                response.data.response.sessionId,
                            );
                        })
                        .catch(error =>
                            console.log('session create error: ', error),
                        );
                }
            })
            .catch(error => console.log('session create error: ', error));
    }, []);

    return props.loading ? (
        <Grid
            container
            justifyContent="center"
            className={classes.loading}
        >
            <Grid item xs={3}>
                <Grid className={classes.activity}>
                    <Sentry
                        color="#28ACEA"
                        size={200}
                        speed={1}
                        animating={true}
                    />
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <>
            <Route />
            <GlobalStyle />
        </>
    );
}

const mapStateToProps = ({ auth }) => {
    return auth;
};
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
