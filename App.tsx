import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {
  enableLatestRenderer,
  LatLng,
  PROVIDER_GOOGLE,
  Region,
  UserLocationChangeEvent,
} from 'react-native-maps';

enableLatestRenderer();

function convertZoomLevelToCoordinateDelta(zoomLevel: number): number {
  // This is a mathematical formula to convert a zoom level to a coordinate delta
  return Math.exp(Math.log(360) - zoomLevel * Math.LN2);
}

const USER_LOCATION_RECENTER_ZOOM_LEVEL = 14;

const coordinateDelta = convertZoomLevelToCoordinateDelta(
  USER_LOCATION_RECENTER_ZOOM_LEVEL,
);

export function App() {
  const currentCoordinatesRef = React.useRef<LatLng>();
  const currentRegionRef = React.useRef<Region>();
  const mapViewRef = React.useRef<MapView>(null);

  const onRegionChange = React.useCallback((region: Region) => {
    currentRegionRef.current = region;
  }, []);

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

  const onPressRecenter = React.useCallback(async () => {
    if (currentCoordinatesRef.current) {
      mapViewRef.current?.animateToRegion({
        latitude: currentCoordinatesRef.current?.latitude,
        latitudeDelta: coordinateDelta,
        longitude: currentCoordinatesRef.current?.longitude,
        longitudeDelta: coordinateDelta,
      });
    }
  }, []);

  return (
    <>
      <MapView
        onRegionChange={onRegionChange}
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
    width: 50,
  },
  flex: {
    flex: 1,
  },
});
