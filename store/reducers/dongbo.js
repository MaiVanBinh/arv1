import * as actionsType from '../actions/actionsType';
import { updateObject } from './utinity';

const initState = {
    loading: false,
    success: null,
    error: null
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionsType.DONG_BO_START: return {
            loading: true,
            success: null,
            error: null
        }
        case actionsType.DONG_BO_SUCCESS: return {
            loading: false,
            success: true,
            error: null
        }
        case actionsType.DONG_BO_FAIL: return {
            loading: false,
            success: false,
            error: null
        }
        default: return state;
    }
}

export default reducer;