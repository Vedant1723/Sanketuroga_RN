import React, {useEffect, useState} from 'react';
import {View, Text, Alert, PermissionsAndroid, Image} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import mapStyle from '../constants/mapStyle.json';
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const categories = [
  {
    name: 'Hospital & Affected Areas',
    bgColor: '#fff',
    fontColor: '#000',
  },
  {
    name: 'Medical Stores',
    bgColor: '#fff',
    fontColor: '#000',
  },
  {
    name: 'Police Stations',
    bgColor: '#fff',
    fontColor: '#000',
  },
];

const Nearby = () => {
  const [geo, setGeo] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });

  useEffect(() => {
    const getLocation = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Sanketuroga',
          message: 'Sanketuroga wants to access your location ',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (pos) => {
            setGeo({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              coordinates: geo.coordinates.concat({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
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
      }
    };
    getLocation();
  }, []);

  return (
    <View>
      <MapView
        style={{height: '100%'}}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        region={{
          latitude: geo.latitude,
          longitude: geo.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}>
        <Marker
          coordinate={{
            latitude: geo.latitude,
            longitude: geo.longitude,
          }}
          image={require('../assets/Select.png')}
        />
      </MapView>
      <View
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#fff',
          alignSelf: 'center',
          width: '90%',
          margin: 30,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#e6dfd7',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <TextInput placeholder="Search" style={{width: '90%'}}></TextInput>
        <Image
          style={{
            height: 30,
            width: 30,
            alignSelf: 'flex-end',
            alignSelf: 'center',
          }}
          source={require('../assets/mic.png')}></Image>
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? 90 : 90,
          paddingHorizontal: 20,
        }}>
        {categories.map((c, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              backgroundColor: c.bgColor,
              borderRadius: 20,
              padding: 8,
              marginTop: 5,
              paddingHorizontal: 20,
              marginHorizontal: 5,
              elevation: 2,
            }}
            onPress={() => {
              categories[index].bgColor = '#7877fe';
              categories[index].fontColor = '#fff';
            }}>
            <Text style={{color: c.fontColor}}>{c.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Nearby;
