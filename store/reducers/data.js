import * as actionsType from '../actions/actionsType';
import { updateObject } from './utinity';

const initState = {
    apps: null,
    loading: false
}

const loadAppsStart = (state, action) => {
    return updateObject(state, { loading: true});
}

const loadAppsSuccess = (state, action) => {
    return updateObject(state, {apps: action.apps, loading: false});
}

const createApp = (state, action) => {
    return updateObject(state, {apps: action.updateApps});
}

const deleteAppSuccess = (state, action) => {
    return updateObject(state, {apps: action.updateApps}); 
}

const updateAppSuccess = (state, action) => {
    return updateObject(state, {apps: action.updateApps});
}

const dataReducer = (state = initState, action) => {
    switch(action.type){
        case actionsType.LOAD_APPS_START: return loadAppsStart(state, action);
        case actionsType.LOAD_APPS_SUCCESS: return loadAppsSuccess(state, action); 
        // case actionsType.SET_DATA: return setData(state, action);
        case actionsType.CREATE_APP_CATE: return createApp(state, action);
        case actionsType.DELETE_APP_CATE: return deleteAppSuccess(state, action);
        case actionsType.UPDATE_APP_CATE: return updateAppSuccess(state, action);
        default: return state;
    }
}

export default dataReducer;