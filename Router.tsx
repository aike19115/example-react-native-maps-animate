import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {Map} from './Map';

const BottomTabNavigator = createBottomTabNavigator();

export function Router() {
  return (
    <NavigationContainer>
      <BottomTabNavigator.Navigator>
        <BottomTabNavigator.Screen name={'A'} component={Map} />
        <BottomTabNavigator.Screen name={'B'} component={View} />
        <BottomTabNavigator.Screen name={'C'} component={View} />
      </BottomTabNavigator.Navigator>
    </NavigationContainer>
  );
}
