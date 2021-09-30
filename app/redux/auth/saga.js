import { LOGIN_USER, LOGOUT_USER } from '../actions';
import ApiManager from '../../ApiManager/ApiManager';
import { Manager } from '../../StorageManager/Storage';
import { loginUserError, loginUserSuccess } from './actions';
import { call, all, fork, takeEvery, put } from 'redux-saga/effects';

const api = ApiManager.getInstance();
export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginToServer);
}

function* loginToServer({ payload }) {
    const { body, history } = payload;
    try {
        const response = yield call(asyncLogin, body);
        if (response.data.code === 2003) {
            Manager.setItem('token', response.data.response.hash);
            yield call(
                setAuthorization,
                response.data.response.email,
                response.data.response.hash,
            );
            const userResponse = yield call(getUser);
            if (userResponse.data.code === 1012) {
                Manager.setItem('user', userResponse.data.response);
                yield put(
                    loginUserSuccess(
                        response.data.response.hash,
                        userResponse.data.response,
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
        .send('POST', '/login', body)
        .then(response => response)
        .catch(error => error);

const getUser = async () =>
    await api
        .send('GET', '/getUser', {})
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
    yield all([fork(watchLoginUser), fork(watchLogoutUser)]);
}
