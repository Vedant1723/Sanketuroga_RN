import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import mapStyle from '../../src/constants/mapStyle.json';

const Nearby = () => {
  const [geo, setGeo] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setGeo({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          coordinates: geo.coordinates.concat({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }),
        });
      },
      (error) => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  });

  return (
    <MapView
      children={<Text>Hello</Text>}
      style={{height: '100%'}}
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: geo.latitude,
        longitude: geo.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      }}>
        <Marker coordinate={{
          latitude: geo.latitude,
          longitude: geo.longitude
        }}></Marker>
      </MapView>
  );
};

export default Nearby;
