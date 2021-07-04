/*
 *
 * Route reducer
 *
 */
import produce from 'immer';
import { SET_IS_LOGGED_IN, SET_IS_RESTRICTED } from './constants';

export const initialState = {
  isLoggedIn: false,
  isRestricted: true,
};

/* eslint-disable default-case, no-param-reassign */
const routeReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case SET_IS_LOGGED_IN:
        break;
      case SET_IS_RESTRICTED:
        break;
    }
  });

export default routeReducer;
