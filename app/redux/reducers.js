import authUser from './auth/reducer';
import themeReducer from './theme/reducer';
import driverReducer from './driver/reducer';
import soketReducer from './socket/reducer'
import {combineReducers} from 'redux';
import history from '../utils/history';
import { connectRouter } from 'connected-react-router';

const reducers = combineReducers({
    authUser,
    themeReducer,
    driverReducer,
    soketReducer,
    router: connectRouter(history),
});

export default reducers;