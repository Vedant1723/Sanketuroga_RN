import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/authScreens/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from "./components/authScreens/Profile"
import Logout from "./components/authScreens/Logout"

const Stack = createStackNavigator();

const App = () => {
  const Drawer = createDrawerNavigator();

  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, [userToken]);

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
