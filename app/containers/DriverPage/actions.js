/*
 *
 * DriverPage actions
 *
 */

import { GET_ALL_DRIVER, GET_ALL_DRIVER_ERROR, GET_ALL_DRIVER_SUCCESS } from './constants';

export function getAllDriver() {
  return {
    type: GET_ALL_DRIVER,
  };
}

export function getAllDriverLoaded(driver) {
  return {
    type: GET_ALL_DRIVER_SUCCESS,
    driver,
  };
}

export function getAllDriverError(error) {
  return {
    type: GET_ALL_DRIVER_ERROR,
    error,
  };
}