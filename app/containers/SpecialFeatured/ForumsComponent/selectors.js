import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectForumsComponentDomain = state =>
    state.forumsComponent || initialState;

const makeSelectForumsComponent = () =>
    createSelector(
        selectForumsComponentDomain,
        forumState => forumState.forums,
    );

export default makeSelectForumsComponent;
export { selectForumsComponentDomain };
