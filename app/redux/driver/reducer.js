import { 
    GET_ALL_DRIVER, 
    GET_ALL_DRIVER_ERROR, 
    GET_ALL_DRIVER_SUCCESS 
} from "../actions";


const INIT_STATE = {
    error: '',
    driver: [],
    loading: true,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_DRIVER:
            return {
                ...state,
                error: '',
                loading: true,
            };
        case GET_ALL_DRIVER_SUCCESS:
            return {
                ...state,
                error: '',
                loading: false,
                driver: action.payload.driver,
            };
        case GET_ALL_DRIVER_ERROR:
            return {
                ...state,
                driver: [],
                loading: false,
                error: action.payload.message,
            };
        default:
            return {
                ...state,
            };
    }
};
