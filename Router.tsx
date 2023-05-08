import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Map} from './Map';

const optionsHideHeader = {
  headerShown: false,
} as const;

const TopTabNavigator = createMaterialTopTabNavigator();

function TopTab() {
  return (
    <TopTabNavigator.Navigator>
      <TopTabNavigator.Screen name={'X'} component={Map} />
      <TopTabNavigator.Screen name={'Y'} component={View} />
      <TopTabNavigator.Screen name={'Z'} component={View} />
    </TopTabNavigator.Navigator>
  );
}

const BottomTabNavigator = createBottomTabNavigator();

export function BottomTab() {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen name={'A'} component={TopTab} />
      <BottomTabNavigator.Screen name={'B'} component={View} />
      <BottomTabNavigator.Screen name={'C'} component={View} />
      <BottomTabNavigator.Screen name={'D'} component={View} />
    </BottomTabNavigator.Navigator>
  );
}

const RootStack = createNativeStackNavigator();

export function Router() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={'BottomTab'}>
        <RootStack.Screen
          component={BottomTab}
          name={'BottomTab'}
          options={optionsHideHeader}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
