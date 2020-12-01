import * as actionsType from './actionsType';
import AsyncStorage from '@react-native-community/async-storage';

export const dongbo = (data) => {
    return async dispatch => {
        dispatch({
            type: actionsType.DONG_BO_START
        })
        try {
            await AsyncStorage.setItem('applications', JSON.stringify(data));
            return dispatch({
                type: actionsType.DONG_BO_SUCCESS
            })
        } catch(err) {
            return dispatch({
                type: actionsType.DONG_BO_FAIL
            })
        }
        
    }
}