import * as actionsType from './actionsType';
import AsyncStorage from '@react-native-community/async-storage';

const loadAppSuccess = (apps) => {
  return {
    type: actionsType.LOAD_APPS_SUCCESS,
    apps: apps,
  };
};
export const loadApp = () => {
  return async (dispatch) => {
    dispatch({
      type: actionsType.LOAD_APPS_START,
    });
    try {
      const apps = await AsyncStorage.getItem('applications');
      if (apps === null) {
        await AsyncStorage.setItem('applications', JSON.stringify([]));
        return dispatch(loadAppSuccess([]));
      } else {
        return dispatch(loadAppSuccess(JSON.parse(apps)));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createAppSuccess = (updateApps) => {
  return {
    type: actionsType.CREATE_APP_CATE,
    updateApps: updateApps,
  };
};

const deleteAppcategorySuccess = (updateApps) => {
  return {
    type: actionsType.DELETE_APP_CATE,
    updateApps: updateApps,
  };
};

export const deleteAppCate = (id) => {
  return (dispatch) => {
    AsyncStorage.getItem('applications')
      .then((value) => {
        const data = JSON.parse(value);
        const updateApps = data.filter((item) => item.id !== id);
        AsyncStorage.setItem('applications', JSON.stringify(updateApps))
          .then(() => dispatch(deleteAppcategorySuccess(updateApps)))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
};

const updateAppCateSucess = (updateApps) => {
  return {
    type: actionsType.UPDATE_APP_CATE,
    updateApps: updateApps,
  };
};

export const onChangeApp = (id, name, icon, mode) => {
  return (dispatch) => {
    AsyncStorage.getItem('applications')
      .then((applications) => {
        const updateApps = JSON.parse(applications);
        if (mode === 'u') {
          const index = updateApps.findIndex((item) => item.id === id);
          updateApps[index] = {
            id: id,
            name: name,
            icon: icon,
          };
          AsyncStorage.setItem('applications', JSON.stringify(updateApps))
            .then(() => dispatch(updateAppCateSucess(updateApps)))
            .catch((err) => console.log(err));
        } else if (mode === 'c') {
          updateApps.push({id: id, name: name, icon: icon});
          AsyncStorage.setItem('applications', JSON.stringify(updateApps))
            .then(() => dispatch(createAppSuccess(updateApps)))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
};

export const dongboApps = (apps) => {
  return (dispatch) => {
    dispatch({
      type: actionsType.DONG_BO_APPS,
      apps: apps,
    });
  };
};
