
import ApiManager from '../../ApiManager/ApiManager';
import { getAllDriverError, getAllDriverSuccess } from './actions';
import { call, all, fork, takeEvery, put } from 'redux-saga/effects';
import { GET_ALL_DRIVER } from '../actions';
import APIURLS from '../../ApiManager/apiUrl';

const api = ApiManager.getInstance();

export function* watchGetAlDriver() {
    yield takeEvery(GET_ALL_DRIVER, callGetAllDriver);
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

const getAllDriver = async () =>
    await api
        .send('GET', APIURLS.getAlldrivers , {})
        .then(response => response)
        .catch(error => error);

export default function* rootSaga() {
    yield all([fork(watchGetAlDriver)]);
}