import produce from 'immer';
import { CHANGE_FORUM } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const forumsComponentReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case CHANGE_FORUM:
                draft.forums = action.forums;
                break;
        }
    });

export default forumsComponentReducer;
