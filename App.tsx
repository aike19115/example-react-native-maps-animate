import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Map} from './Map';
import {Router} from './Router';

// By toggling this you can turn on/off the bug
const enableRouting = true;

export function App() {
  return (
    <SafeAreaProvider>{enableRouting ? <Router /> : <Map />}</SafeAreaProvider>
  );
}
