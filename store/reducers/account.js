import { useAsyncStorage } from '@react-native-community/async-storage';
import { acc } from 'react-native-reanimated';
import { act } from 'react-test-renderer';
import * as actionsType from '../actions/actionsType';
import { updateObject } from './utinity';

const initState = {
    accounts: [],
    error: null,
    loading: false
}
const loadAccounts = (state, action) => {
    return updateObject(state, { loading: false, accounts: action.accounts});
}

export const createAccountStart = (state, action) =>{
    return state;
}

export const createAccountSuccess = (state, action) => {
    return updateObject(state, {accounts: action.updateAcc, loading: false});
}

export const createAccountFail = (state, action) => {
    return state;
}
const deleteAccount = (state, action) => {
    console.log(action.id)
    const ua = [...state.accounts].filter(item => item.id !== action.id);
    return updateObject(state, {
        accounts: [...ua]
    })
}

const updateAccountSuccess = (state, action) => {
    const ua = [...state.accounts];
    const index = ua.findIndex(item => item.id === action.newAccount.id);
    ua[index] = action.newAccount
    return updateObject(state, { accounts: ua});

}
const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionsType.LOAD_ACCOUNT_START: return updateObject(state, { loading: true});
        case actionsType.LOAD_ACCOUNT_SUCCESS: return loadAccounts(state, action);
        case actionsType.CREATE_ACCOUNT_START: return createAccountStart(state, action);
        case actionsType.CREATE_ACCOUNT_SUCCESS: return createAccountSuccess(state, action);
        case actionsType.CREATE_ACCOUNT_FAIL: return createAccountFail(state,action);
        case actionsType.DELETE_ACCOUNT: return deleteAccount(state, action);
        case actionsType.UPDATE_ACCOUNT_SUCCESS: return updateAccountSuccess(state, action);
        default: return state;
    }
}

export default reducer;