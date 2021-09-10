import authSagas from './auth/saga';
import driverSagas from './driver/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga(getState) {
    yield all([authSagas(), driverSagas()]);
}
