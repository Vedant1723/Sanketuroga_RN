import React, {useContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../Context';
import Login from './Login';
import OnBoarding from './OnBoarding';
import Signup from './Signup';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const LoginStack = () => {
  const {
    authContext: {onStart},
      state: {loaded},
  } = useContext(AuthContext);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getLoad = async () => {
      const loadd = await AsyncStorage.getItem("load")
      if(loadd){
        setLoad(true)
      }
    }
    setLoad(loaded);
    getLoad()
  }, [loaded]);

  return (
    <>
      {load ? (
        (
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Signup"
              component={Signup}
            />
          </Stack.Navigator>
        )
      ) : (
        <OnBoarding />
      )}
    </>
  );
};

export default LoginStack;
