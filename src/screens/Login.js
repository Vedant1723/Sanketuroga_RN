import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  AlertIOS,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import {AuthContext} from '../../Context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import eye from '../assets/eye.png';
import hide from '../assets/hide.png';

const Login = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const {
    authContext: {signIn},
    state: {signInError},
  } = useContext(AuthContext);

  useEffect(() => {
    if (signInError) {
      setErrors(signInError);
    }
  }, [signInError]);

  const [pass, setPass] = useState(true);
  const [icon, setIcon] = useState(hide);

  const hidePassword = () => {
    setPass(!pass);
    if (icon == hide) {
      setIcon(eye);
    } else {
      setIcon(hide);
    }
  };

  const loginUser = () => {
    if (!phoneNumber || !password) {
      ToastAndroid.show(
        'Please enter all the required fields',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else {
      signIn({phoneNumber, password});
    }
  };
 const fingerAuth = () => {
    if (FingerprintScanner.isSensorAvailable) {
      console.log('Han Bhai');
    } else {
      console.log("Na Bhai")
    }
    const auth = FingerprintScanner.authenticate({
      title: 'Log in with Biometrics',
    }).then(() => {
      //props.onAuthenticate();)
      navigation.navigate('Signup');
    });
    console.log(auth.finally());
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
        }}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Image
            source={require('../assets/corona.png')}
            style={{resizeMode: 'contain', height: 200, width: 200}}></Image>
        </View>
        <View
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: '#7877fe', fontSize: 25}}>
            Corona{' '}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>Virus</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={{color: '#808080', fontSize: 15}}>
            Caring for Future
          </Text>
        </View>
        {errors ? (
          <View>
            <Text
              style={{
                color: 'red',
                marginLeft: 30,
                paddingTop: 10,
                fontSize: 16,
              }}>
              {errors}
            </Text>
          </View>
        ) : null}
        <View style={{marginTop: 20, display: 'flex'}}>
          <View
            style={{
              borderColor: '#808080',
              borderTopWidth: 0.5,
              marginLeft: 30,
              marginRight: 30,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/privacy.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
            <TextInput
              placeholder="Enter Mobile No."
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              keyboardType="number-pad"
              maxLength={10}
              style={{
                marginLeft: 5,
                width: '100%',
              }}></TextInput>
          </View>
          <View style={{display: 'flex', justifyContent: 'space-between'}}>
            <View
              style={{
                //display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#808080',
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                marginLeft: 30,
                marginRight: 30,
              }}>
              <Image
                source={require('../assets/lock.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
              <TextInput
                secureTextEntry={pass}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                style={{marginHorizontal: 5, width: '85%'}}></TextInput>
              <TouchableOpacity
                onPress={() => hidePassword()}
                style={{right: 0}}>
                <Image
                  source={icon}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    tintColor: '#c8c8c8',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => loginUser()}
          style={{
            backgroundColor: '#7877fe',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            height: 36,
            marginStart: 20,
            marginEnd: 20,
            marginTop: 20,
          }}>
          <Text style={{color: '#fff'}}>LOGIN</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 30,
            marginRight: 30,
          }}>
          <View
            style={{
              borderBottomColor: '#808080',
              borderBottomWidth: 0.5,

              width: '40%',
            }}></View>
          <View>
            <Text style={{fontWeight: 'bold'}}>OR</Text>
          </View>
          <View
            style={{
              borderBottomColor: '#808080',
              borderBottomWidth: 0.5,
              width: '40%',
            }}></View>
        </View>
        <TouchableOpacity
          onPress={() => fingerAuth()}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            source={require('../assets/fingerprint.png')}
            style={{height: 100, width: 100, resizeMode: 'contain'}}
          />
        </TouchableOpacity>

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text>Don't have an Account?</Text>
            <Text> </Text>
            <Text
              onPress={() => navigation.navigate('Signup')}
              style={{
                fontWeight: 'bold',
                color: '#7877fe',
                textDecorationLine: 'underline',
              }}>
              Register
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btn: {
    textTransform: 'lowercase',
    textAlign: 'center',
  },
});

export default Login;
