import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import { } from '@react-navigation/drawer';

import AppCategories from '../screens/AppCategories';
import JSEditor from '../screens/JSEditor';
import Account from '../screens/ListAccount';

const AppStackNavigator = createStackNavigator();

const AppStackNavigation = (props) => {
  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator>
        <AppStackNavigator.Screen
          name="application"
          component={AppCategories}
          options={{
            headerTitle: 'Applications',
            headerStyle: {
              backgroundColor: '#16a596',
            },
          }}
        />
        <AppStackNavigator.Screen
          name="accounts"
          component={Account}
          options={{
            headerTitle: 'Accounts',
            headerStyle: {
              backgroundColor: '#16a596',
            },
          }}
        />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigation;
