import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Map} from './Map';

const optionsHideHeader = {
  headerShown: false,
} as const;

const BottomTabNavigator = createBottomTabNavigator();

function BottomTab() {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen name={'A'} component={Map} />
      <BottomTabNavigator.Screen name={'B'} component={View} />
      <BottomTabNavigator.Screen name={'C'} component={View} />
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
