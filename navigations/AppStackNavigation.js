import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import { } from '@react-navigation/drawer';
import {connect} from 'react-redux';
import AppCategories from '../screens/AppCategories';
import JSEditor from '../screens/JSEditor';
import Account from '../screens/ListAccount';
import StartScreen from '../screens/StartScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {setData} from '../store/actions/data';
import QRCode from '../screens/QRCode';

const AppStackNavigator = createStackNavigator();

const AppStackNavigation = (props) => {
  let contentApp = <StartScreen />;
  if (true) {
    contentApp = (
      <NavigationContainer>
        <AppStackNavigator.Navigator>
          <AppStackNavigator.Screen
            name="application"
            component={AppCategories}
            options={{
              headerTitle: 'Applications',
              headerStyle: {
                backgroundColor: '#C69F89',
              },
            }}
          />
          <AppStackNavigator.Screen
            name="accounts"
            component={Account}
            options={{
              headerTitle: 'Accounts',
              headerStyle: {
                backgroundColor: '#C69F89',
              },
            }}
          />
          <AppStackNavigator.Screen
            name="share"
            component={QRCode}
            options={{
              headerTitle: 'share',
              headerStyle: {
                backgroundColor: '#C69F89',
              },
            }}
          />
        </AppStackNavigator.Navigator>
      </NavigationContainer>
    );
  }
  return contentApp;
};
const mapStateToProps = (state) => {
  return {
    loadSuccess: state.data.loadSuccess,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSetData: (data) => dispatch(setData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppStackNavigation);
