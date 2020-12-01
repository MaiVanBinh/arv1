import * as actionsType from './actionsType';

// const auth = () => {
//     return dispatch => {
//         dispatch({
//             type: actionsType.AUTH_START
//         })
//     }
// }

export const authSuccess = () => {
    console.log('success action');
    return {
        type: actionsType.AUTH_SUCCESS
    }
}

export const authFail = () => {
    return {
        type: actionsType.AUTH_FAIL
    }
}

