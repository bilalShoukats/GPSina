
import ApiManager from '../../ApiManager/ApiManager';
import { getAllDriverError, getAllDriverSuccess } from './actions';
import { call, all, fork, takeEvery, put } from 'redux-saga/effects';
import { ADD_DRIVER, GET_ALL_DRIVER } from '../actions';
import APIURLS from '../../ApiManager/apiUrl';

const api = ApiManager.getInstance();

export function* watchGetAllDriver() {
    yield takeEvery(GET_ALL_DRIVER, callGetAllDriver);
}

export function* watchAddDriver() {
    yield takeEvery(ADD_DRIVER, callAddDriver);
}

function* callGetAllDriver({ payload }) {
    // const { history } = payload;
    try {
        const getAllDriverResponse = yield call(getAllDriver);
        console.log('getAllDriverResponse', getAllDriverResponse);
        if (getAllDriverResponse.data.code === 1019) {
            console.log('getAllDriver saga: ', getAllDriverResponse.data.response);
            yield put(
                getAllDriverSuccess(getAllDriverResponse.data.response),
                );
        } else {
            console.log('err', err);
            yield put(getAllDriverError(getAllDriverResponse.data.code));
        }

    } catch(err){
        yield put(getAllDriverError(err));
    }
}

function* callAddDriver({ payload }) {
    const { body, history } = payload;
    try {
        const addDriverResponse = yield call(addDriver, body);
        console.log('addDriverResponse', addDriverResponse);
        if (addDriverResponse.data.code === 1008) {
            console.log('addDriver saga: ', addDriverResponse.data.response);
            yield put(getAllDriverSuccess(addDriverResponse.data.id));
            history.goBack();
        } else {
            console.log('err', err);
            yield put(getAllDriverError(addDriverResponse.data.code));
        }

    } catch(err){
        yield put(getAllDriverError(err));
    }
}

const getAllDriver = async () =>
    await api
        .send('GET', APIURLS.getAlldrivers , {})
        .then(response => response)
        .catch(error => error);

const addDriver = async (body) =>
    await api
        .send('POST', APIURLS.getAlldrivers , body)
        .then(response => response)
        .catch(error => error);

export default function* rootSaga() {
    yield all([fork(watchGetAllDriver), fork(watchAddDriver)]);
}