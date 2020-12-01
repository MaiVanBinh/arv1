import * as actionsType from './actionsType';
import AsyncStorage from '@react-native-community/async-storage';
import {acc} from 'react-native-reanimated';
import {encrypt} from '../../utinity/encrypt';

const loadAccountSuccess = (accounts) => {
  return {
    type: actionsType.LOAD_ACCOUNT_SUCCESS,
    accounts: accounts,
  };
};

export const loadAccount = (appId) => {
  return async (dispatch) => {
    dispatch({
      type: actionsType.LOAD_ACCOUNT_START,
    });
    try {
      const accounts = await AsyncStorage.getItem('accounts');
      console.log(accounts);
      if (accounts === null) {
        await AsyncStorage.setItem('accounts', JSON.stringify([]));
        return dispatch(loadAccountSuccess([]));
      } else {
        const listAccs = JSON.parse(accounts).filter(
          (item) => item.app === appId,
        );
        return dispatch({
          type: actionsType.LOAD_ACCOUNT_SUCCESS,
          accounts: listAccs,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const createAccountStart = () => {
  return {
    type: actionsType.CREATE_ACCOUNT_START,
  };
};

const createAccountSuccess = (updateAcc) => {
  return {
    type: actionsType.CREATE_ACCOUNT_SUCCESS,
    updateAcc: updateAcc,
  };
};

const createAccountFail = (errMessage) => {
  return {
    type: actionsType.CREATE_ACCOUNT_FAIL,
    errMessage: errMessage,
  };
};

export const createAccount = (id, username, password, key, app) => {
  return async (dispatch) => {
    dispatch(createAccountStart());
    try {
      const accounts = await AsyncStorage.getItem('accounts');
      const updateAcc = JSON.parse(accounts);
      const passwordUpdate = encrypt(password, key);
      updateAcc.push({
        id: id,
        username: username,
        password: passwordUpdate,
        app: app,
      });

      await AsyncStorage.setItem('accounts', JSON.stringify(updateAcc));
      const accs = updateAcc.filter((item) => item.app === app);
      return dispatch(createAccountSuccess(accs));
    } catch (err) {
      // return dispatch(createAccountFail(err.message));
      console.log(err);
    }
  };
};

export const deleteAcc = (id) => {
  return async (dispatch) => {
    try {
      const accounts = await AsyncStorage.getItem('accounts');
      const updateAcc = JSON.parse(accounts).filter((item) => item.id !== id);
      await AsyncStorage.setItem('accounts', JSON.stringify(updateAcc));
      return dispatch({
        type: actionsType.DELETE_ACCOUNT,
        id: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateAccount = (id, username, password, key, app) => {
  return async (dispatch) => {
    dispatch({
      type: actionsType.LOAD_ACCOUNT_START,
    });
    try {
      const accs = JSON.parse(await AsyncStorage.getItem('accounts'));
      const index = accs.findIndex((item) => item.id === id);
      if (index >= 0) {
        accs[index] = {
          id: id,
          username: username,
          password: password,
          app: app,
        };
        await AsyncStorage.setItem('accounts', JSON.stringify(accs));
        return dispatch({
          type: actionsType.UPDATE_ACCOUNT_SUCCESS,
          newAccount: {
            id: id,
            username: username,
            password: password,
            app: app,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
