import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {
  enableLatestRenderer,
  LatLng,
  PROVIDER_GOOGLE,
  UserLocationChangeEvent,
} from 'react-native-maps';

enableLatestRenderer();

// By toggling this you can turn on/off the bug
const enableAnimation = true;

export function Map() {
  const currentCoordinatesRef = React.useRef<LatLng>();
  const mapViewRef = React.useRef<MapView>(null);

  const onUserLocationChange = React.useCallback(
    (event: UserLocationChangeEvent) => {
      if (event.nativeEvent.coordinate) {
        currentCoordinatesRef.current = {
          latitude: event.nativeEvent.coordinate.latitude,
          longitude: event.nativeEvent.coordinate.longitude,
        };
      }
    },
    [],
  );

  const onPressRecenter = React.useCallback(() => {
    if (currentCoordinatesRef.current) {
      const partialCamera = {
        center: {
          latitude: currentCoordinatesRef.current.latitude,
          longitude: currentCoordinatesRef.current.longitude,
        },
        zoom: 14,
      } as const;
      if (enableAnimation) {
        mapViewRef.current?.animateCamera(partialCamera);
      } else {
        mapViewRef.current?.setCamera(partialCamera);
      }
    }
  }, []);

  return (
    <>
      <MapView
        onUserLocationChange={onUserLocationChange}
        provider={PROVIDER_GOOGLE}
        ref={mapViewRef}
        showsMyLocationButton={false}
        showsUserLocation={true}
        style={styles.flex}
        zoomEnabled={true}
      />
      <SafeAreaView pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <TouchableOpacity
          onPress={onPressRecenter}
          style={styles.buttonRecenter}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  buttonRecenter: {
    backgroundColor: 'red',
    height: 50,
    marginLeft: 'auto',
    width: 50,
  },
  flex: {
    flex: 1,
  },
} as const);
