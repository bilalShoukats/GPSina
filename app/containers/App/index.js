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
import { setSession, loginUserSuccess } from '../../redux/auth/actions';

function App(props) {
    let api = ApiManager.getInstance();

    React.useEffect(() => {
        if (props.token === null) {
            Manager.getItem('token')
                .then(token => {
                    if (token !== null && token !== '') {
                        Manager.getItem('user')
                            .then(user => {
                                if (user !== null && user !== '') {
                                    api.setToken(JSON.parse(user).email, token);
                                    props.dispatch(
                                        loginUserSuccess(
                                            token,
                                            JSON.parse(user),
                                        ),
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
        Manager.getItem('sessionId')
            .then(sessionId => {
                if (sessionId != null && sessionId != '') {
                    props.dispatch(setSession(sessionId));
                } else {
                    api.send('PUT', '/createSession', { fcmKey: '123' })
                        .then(response => {
                            api.setSession(response.data.response.sessionId);
                            props.dispatch(
                                setSession(response.data.response.sessionId),
                            );
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

    return (
        <>
            <Route />
            <GlobalStyle />
        </>
    );
}

const mapStateToProps = state => {
    const { auth } = state;
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
