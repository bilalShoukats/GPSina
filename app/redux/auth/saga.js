import { LOGIN_USER, LOGOUT_USER, LOGIN_PHONE_USER } from '../actions';
import ApiManager from '../../ApiManager/ApiManager';
import { Manager } from '../../StorageManager/Storage';
import { loginUserError, loginUserSuccess } from './actions';
import { call, all, fork, takeEvery, put } from 'redux-saga/effects';
import APIURLS from '../../ApiManager/apiUrl';

const api = ApiManager.getInstance();
export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginToServer);
}

export function* watchLoginPhoneUser() {
    yield takeEvery(LOGIN_PHONE_USER, loginPhoneToServer);
}

function* loginPhoneToServer({ payload }) {
    const { body, history } = payload;
    console.log("loginToServer body==>",body)
    try {
            yield call(
                setAuthorization,
                body.email,
                body.hash,
            );

            const userResponse = yield call(getUser);
            console.log("userResponse.data.code",userResponse.data.code)
            console.log("userResponse",userResponse)
            if (userResponse.data.code === 1012) {
                console.log('This is after getUser response', userResponse);
                Manager.setItem('user', userResponse.data.response);
                yield put(
                    loginUserSuccess(
                        body.hash,
                        userResponse.data.response,
                        // response.data.response.email,
                    ),
                );
                history.push('/');
            } else {
                yield put(loginUserError(userResponse.data.id));
            }
    } catch (error) {
        yield put(loginUserError(error.message));
    }
}


function* loginToServer({ payload }) {
    const { body, history } = payload;
    console.log("loginToServer body==>",body)
    try {
        const response = yield call(asyncLogin, body);
        console.log('response.data.code', response.data.code);
        if (response.data.code === 7011) {
            // response.data.response.userName = '';
            console.log('user data response>>1 after success code', response);
            localStorage.setItem('hash', response.data.response.hash);
            localStorage.setItem('email', response.data.response.email);

            console.log("loacl",response.data.response.hash,response.data.response.email);
            yield call(
                setAuthorization,
                response.data.response.email,
                response.data.response.hash,
            );

            yield put(
                loginUserSuccess(
                    response.data.response.hash,
                    userResponse.data.response,
                    response.data.response.email,
                ),
            );

            const userResponse = yield call(getUser);
            console.log("userResponse.data.code",userResponse.data.code)
            console.log("userResponse",userResponse)
            if (userResponse.data.code === 1012) {
                console.log('This is after getUser response', userResponse);
                Manager.setItem('user', userResponse.data.response);
                console.log("response.data.response.hash",response.data.response.hash)
                console.log("userResponse.data.response",userResponse.data.response)
                    yield put(
                        loginUserSuccess(
                            response.data.response.hash,
                            userResponse.data.response,
                            // response.data.response.email,
                        ),
                    );
                    history.push('/');
            } else {
                yield put(loginUserError(userResponse.data.id));
            }

        } else {
            yield put(loginUserError(response.data.id));
        }
    } catch (error) {
        yield put(loginUserError(error.message));
    }
}

const asyncLogin = async body =>
    await api
        .send('POST', APIURLS.login, body)
        .then(response => response)
        .catch(error => error);

const getUser = async () =>
    await api
        .send('GET', APIURLS.getUser, {})
        .then(response => response)
        .catch(error => error);

const setAuthorization = async (email, token) =>
    await api.setToken(email, token);

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

function* logout({ payload }) {
    Manager.removeItem('user');
    Manager.removeItem('token');
    payload.history.push('/login');
}

export default function* rootSaga() {
    yield all([fork(watchLoginUser), fork(watchLogoutUser), fork(watchLoginPhoneUser)]);
}
