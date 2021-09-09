import authUser from './auth/reducer';
import themeReducer from './theme/reducer';
import {combineReducers} from 'redux';
import history from '../utils/history';
import { connectRouter } from 'connected-react-router';

const reducers = combineReducers({
    authUser,
    themeReducer,
    router: connectRouter(history),
});

export default reducers;