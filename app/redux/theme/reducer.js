import {
    DARK_THEME,
    LIGHT_THEME,
} from '../actions';

const INIT_STATE = {
    darkMode: true,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case DARK_THEME:
            return {
                ...state,
                darkMode: true
            };

        case LIGHT_THEME:
            return {
                ...state,
                darkMode: false
            };

        default:
            return state
    }
};
