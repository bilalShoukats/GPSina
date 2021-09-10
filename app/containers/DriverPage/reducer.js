/*
 *
 * DriverPage reducer
 *
 */
import produce from 'immer';
import { GET_ALL_DRIVER, GET_ALL_DRIVER_ERROR, GET_ALL_DRIVER_SUCCESS } from './constants';

export const initialState = {
    error: false,
    driver: [],
    loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const driverPageReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GET_ALL_DRIVER:
                draft.loading = true;
                draft.error = false;
                draft.driver = [];
                break;

            case GET_ALL_DRIVER_SUCCESS:
                draft.driver = action.driver;
                draft.loading = false;
                break;

            case GET_ALL_DRIVER_ERROR:
                draft.error = action.error;
                draft.loading = false;
                break;
        }
    });

export default driverPageReducer;
