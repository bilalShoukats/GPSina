import authUser from './auth/reducer';
import {combineReducers} from 'redux';
import history from '../utils/history';
import { connectRouter } from 'connected-react-router';

const reducers = combineReducers({
    authUser,
    router: connectRouter(history),
});

export default reducers;