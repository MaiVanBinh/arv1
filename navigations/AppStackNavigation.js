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
import Login from '../screens/Login';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
const AppStackNavigator = createStackNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="application"
        component={AppCategories}
        options={{
          headerTitle: 'Applications',
          headerStyle: {
            backgroundColor: '#C69F89',
          },
        }}
      />
      <HomeStack.Screen
        name="accounts"
        component={Account}
        options={{
          headerTitle: 'Accounts',
          headerStyle: {
            backgroundColor: '#C69F89',
          },
        }}
      />
      <HomeStack.Screen
        name="share"
        component={QRCode}
        options={{
          headerTitle: 'share',
          headerStyle: {
            backgroundColor: '#C69F89',
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

const ShareStack = createStackNavigator();

function ShareScreen() {
  return (
    <ShareStack.Navigator>
      <ShareStack.Screen
        name="share"
        component={QRCode}
        options={{
          headerTitle: 'Share',
          headerStyle: {
            backgroundColor: '#C69F89',
          },
        }}
      />
    </ShareStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const AppStackNavigation = (props) => {
  let contentApp = <Login />;
  if (props.success) {
    contentApp = (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return (
                  <Icon
                    name={
                      focused
                        ? 'ios-home'
                        : 'ios-home-outline'
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'share') {
                return (
                  <Icon
                    name={focused ? 'ios-share' : 'ios-share-outline'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
          />
          <Tab.Screen
            name="share"
            component={ShareScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  return contentApp;
};
const mapStateToProps = (state) => {
  return {
    loadSuccess: state.data.loadSuccess,
    success: state.auth.success,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSetData: (data) => dispatch(setData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppStackNavigation);
