
import { CHANGE_FORUM } from './constants';

export function changeLocale(forumsChanges) {
    return {
        type: CHANGE_FORUM,
        forums: forumsChanges,
    };
}
