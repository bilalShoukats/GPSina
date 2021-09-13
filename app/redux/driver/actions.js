import {
    ADD_DRIVER,
    ADD_DRIVER_ERROR,
    ADD_DRIVER_SUCCESS,
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

export const addDriver = (body, history) => ({
    type: ADD_DRIVER,
    payload: { body, history },
});

export const addDriverSuccess = (message) => ({
    type: ADD_DRIVER_SUCCESS,
    payload: { message },
});

export const addDriverError = message => ({
    type: ADD_DRIVER_ERROR,
    payload: { message },
});
