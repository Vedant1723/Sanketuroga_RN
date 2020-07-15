import 'react-native-gesture-handler';

import {ActivityIndicator, Alert, Text, View} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './Context';
import CustomDrawerContent from './src/screens/CustomDrawerContent';
import LoginStack from './src/screens/LoginStack';
import Logout from './src/screens/Logout';
import MainFlow from './src/screens/MainFlow';
import {NavigationContainer} from '@react-navigation/native';
import Profile from './src/screens/Profile';
import axios from 'axios';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {navigationRef} from './src/navigationRef';
import setAuthToken from './src/utils/setAuthToken';

const Drawer = createDrawerNavigator();

const App = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGNIN':
        case 'SIGNUP':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.payload,
          };
        case 'SIGNIN_ERROR':
          console.log(action.payload);
          AsyncStorage.removeItem('token');
          return {
            ...prevState,
            userToken: null,
            signInError: action.payload,
          };
        case 'SIGNUP_ERROR':
          console.log(action.payload);
          AsyncStorage.removeItem('token');
          return {
            ...prevState,
            userToken: null,
            signUpError: action.payload,
          };
        case 'SIGN_OUT':
          AsyncStorage.removeItem('token');
          return {
            ...prevState,
            isSignout: true,
            error: null,
            userToken: null,
          };
        case 'LOAD_USER':
          return {
            ...prevState,
            user: action.payload,
          };
        case 'UPDATE_USER':
          return {
            ...prevState,
            user: action.payload,
          };
        case 'STARTUP':
          return {
            ...prevState,
            loaded: action.payload,
          };
        case 'UPDATE_ERROR':
          console.log(action.payload);
          return {
            ...prevState,
          };
        case 'LOAD_ERROR':
          console.log(action.payload);
          return {
            ...prevState,
          };
        case 'AUTH_ERROR':
          console.log(action.payload);
          AsyncStorage.removeItem('token');
          return {
            ...prevState,
            userToken: null,
            error: action.payload,
          };
        default:
          return state;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
      error: null,
      signInError: null,
      signUpError: null,
      loaded: false,
    },
  );

  React.useEffect(() => {
    setLoading(true);
    
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
      setLoading(false);
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (formData) => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        };
        try {
          const res = await axios.post(
            'http://192.168.42.106:5000/api/login',
            formData,
            config,
          );
          await AsyncStorage.setItem('token', res.data.token);
          dispatch({type: 'SIGNIN', payload: res.data.token});
          navigation.navigate('Stats');
        } catch (error) {
          dispatch({type: 'SIGNIN_ERROR', payload: error.response.data.error});
        }
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (formData) => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        };
        try {
          const res = await axios.post(
            'http://192.168.42.106:5000/api/signup',
            formData,
            config,
          );
          console.log(res.data);
          await AsyncStorage.setItem('token', res.data.token);
          dispatch({type: 'SIGNUP', payload: res.data.token});
          navigation.navigate('Stats');
        } catch (error) {
          dispatch({type: 'SIGNUP_ERROR', payload: error.response.data.error});
        }
      },
      loadUser: async () => {
        const token = await AsyncStorage.getItem('token');
        setAuthToken(token);
        try {
          const res = await axios.get('http://192.168.42.106:5000/api/');
          dispatch({type: 'LOAD_USER', payload: res.data});
        } catch (error) {
          dispatch({type: 'LOAD_ERROR', payload: error.response.data.error});
        }
      },
      updateProfile: async (formData) => {
        const token = await AsyncStorage.getItem('token');
        setAuthToken(token);
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        };
        try {
          const res = await axios.put(
            'http://192.168.42.106:5000/api/update',
            formData,
            config,
          );
          console.log('LODDDAAA', res.data);

          dispatch({type: 'UPDATE_USER', payload: res.data});
        } catch (error) {
          dispatch({type: 'UPDATE_ERROR', payload: error.response.data.error});
        }
      },
      onStart: async () => {
        try {
          await AsyncStorage.setItem('load', 'loaded');
          dispatch({type: 'STARTUP', payload: true});
        } catch (error) {
          dispatch({type: 'UPDATE_ERROR', payload: error});
        }
      },
    }),
    [navigation],
  );

  return (
    <AuthContext.Provider value={{authContext, state}}>
      {loading ? (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size={50} color="#7877fe" />
        </View>
      ) : (
        <NavigationContainer ref={navigationRef}>
          {state.userToken ? (
            <Drawer.Navigator
              drawerContent={(props) => <CustomDrawerContent {...props} />}>
              <Drawer.Screen name="Home" component={MainFlow} />
              <Drawer.Screen
                name="Profile"
                component={Profile}
                options={{title: 'Profile'}}
              />
            </Drawer.Navigator>
          ) : (
            <LoginStack />
          )}
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
};

export default App;
