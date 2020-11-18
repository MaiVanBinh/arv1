import React from 'react';
import {
  StatusBar
} from 'react-native';
import AppStackNavigation from './navigations/AppStackNavigation';
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppStackNavigation />
    </>
  );
};
export default App;
