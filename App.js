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

const rootReducer = combineReducers({
  data: dataReducers,
  accounts: accountsReducer
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

