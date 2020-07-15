import {Image, View} from 'react-native';
import React, {useContext} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../Context';
import Onboarding from 'react-native-onboarding-swiper';

const OnBoarding = ({navigation}) => {
  const {
    authContext: {onStart},
  } = useContext(AuthContext);

  const onDone = async () => {
    onStart();
    navigation.navigate('Login');
  };

  return (
    <Onboarding
      onDone={() => onDone()}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={{width: 250, height: 250, resizeMode: 'contain'}}
              source={require('../assets/ob-1.png')}
            />
          ),
          title: 'Avoid Close Contact',
          subtitle:
            'Keep your distance from others to protect them from getting sick too.',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={{width: 250, height: 250, resizeMode: 'contain'}}
              source={require('../assets/ob-2.png')}
            />
          ),
          title: 'Clean Your Hands Often',
          subtitle:
            'Wash your hands with soap and water,scrub your hands for at least 20 seconds.',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={{width: 250, height: 250, resizeMode: 'contain'}}
              source={require('../assets/ob-3.png')}
            />
          ),
          title: 'Wear a facemask if you are sick',
          subtitle:
            'Consider wearing a face mask when you are sick with a cough or sneezing',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={{width: 250, height: 250, resizeMode: 'contain'}}
              source={require('../assets/ob-4.png')}
            />
          ),
          title: 'Stay at Home',
          subtitle:
            'Staying at home will help control the spread of the virus to friends, the wider community',
        },
      ]}
    />
  );
};
export default OnBoarding;
