import React from 'react';
import {
  StatusBar
} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AppStackNavigation from './navigations/AppStackNavigation';
import dataReducers from './store/reducers/data';
import accountsReducer  from './store/reducers/account';
import dongboReducer from './store/reducers/dongbo';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  data: dataReducers,
  accounts: accountsReducer,
  dongbo: dongboReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = (props) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
          <AppStackNavigation />
      </Provider>
    </>
  );
};

export default App;

