import { FlatList } from 'react-native-gesture-handler';
import * as actionsType from '../actions/actionsType';

const initState = {
    loading: false,
    success: null,
    error: null
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionsType.AUTH_START: return {
            loading: true,
            success: null,
            error: null
        }
        case actionsType.AUTH_SUCCESS: return {
            loading: false,
            success: true,
            error: false
        }
        case actionsType.AUTH_FAIL: return {
            loading: false,
            success: false,
            error: true
        }
        default: return state
    }
}

export default reducer;