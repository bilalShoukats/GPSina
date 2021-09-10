/**
 * Combine all reducers in this file and export the combined reducers.
 */

import history from 'utils/history';
import { combineReducers } from 'redux';
import authUser from './redux/auth/reducer';
import themeReducer from './redux/theme/reducer';
import driverReducer from './redux/driver/reducer';
import { connectRouter } from 'connected-react-router';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        auth: authUser,
        theme: themeReducer,
        driver: driverReducer,
        language: languageProviderReducer,
        router: connectRouter(history),
        ...injectedReducers,
    });

    return rootReducer;
}
