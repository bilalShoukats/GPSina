import {
    GET_ALL_DRIVER, 
    GET_ALL_DRIVER_ERROR, 
    GET_ALL_DRIVER_SUCCESS 
} from "../actions";


export const getAllDriver = (history) => ({
    type: GET_ALL_DRIVER,
    payload: { history },
});

export const getAllDriverSuccess = (driver) => ({
    type: GET_ALL_DRIVER_SUCCESS,
    payload: { driver },
});

export const getAllDriverError = message => ({
    type: GET_ALL_DRIVER_ERROR,
    payload: { message },
});
