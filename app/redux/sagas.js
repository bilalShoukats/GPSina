import authSagas from './auth/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga(getState) {
    yield all([authSagas()]);
}
