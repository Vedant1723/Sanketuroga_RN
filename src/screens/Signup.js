import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {AuthContext} from '../../Context';
import SimpleToast from 'react-native-simple-toast';
import {TouchableOpacity} from 'react-native-gesture-handler';
import eye from '../assets/eye.png';
import hide from '../assets/hide.png';

const Signup = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const {
    authContext: {signUp},
    state: {signUpError},
  } = useContext(AuthContext);

  useEffect(() => {
    if (signUpError) {
      setErrors(signUpError);
    }
  }, [signUpError]);

  const [pass, setPass] = useState(true);
  const [cpass, setCPass] = useState(true);
  const [icon, setIcon] = useState(hide);
  const [cicon, setCIcon] = useState(hide);

  const hidePassword = () => {
    setPass(!pass);
    if (icon == hide) {
      setIcon(eye);
    } else {
      setIcon(hide);
    }
  };

  const hideCPassword = () => {
    setCPass(!cpass);
    if (cicon == hide) {
      setCIcon(eye);
    } else {
      setCIcon(hide);
    }
  };

  const submitCred = () => {
    if (!phoneNumber || !password || !confirmPassword) {
      SimpleToast.show('Please enter all the required fields');
    }
    if (password != confirmPassword) {
      SimpleToast.show('Passwords do not match');
    } else {
      signUp({phoneNumber, password});
    }
  };

  return (
    <ScrollView style={{backgroundColor:"#fff"}}>
      <View style={{justifyContent: 'center', display: 'flex', margin: 0}}>
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
                maxLength={10}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                style={{marginLeft: 5, width: '85%'}}></TextInput>

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
          <View style={{display: 'flex', justifyContent: 'space-between'}}>
            <View
              style={{
                //display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#808080',

                borderBottomWidth: 0.5,
                marginLeft: 30,
                marginRight: 30,
              }}>
              <Image
                source={require('../assets/lock.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
              <TextInput
                secureTextEntry={cpass}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                placeholder="Confirm Password"
                style={{marginLeft: 5, width: '85%'}}></TextInput>

<TouchableOpacity
                onPress={() => hideCPassword()}
                style={{right: 0}}>
                <Image
                  source={cicon}
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
          onPress={() => submitCred()}
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
          <Text style={{color: 'white'}}>SIGNUP</Text>
        </TouchableOpacity>

        <View style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
          <Text style={{color: '#808080'}}>+ Add Fingerprint</Text>
        </View>

        <View
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
        </View>

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text>Already have an Account?</Text>
            <Text> </Text>
            <Text
              onPress={() => navigation.push('Login')}
              style={{
                fontWeight: 'bold',
                color: '#7877fe',
                textDecorationLine: 'underline',
              }}>
              Login
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
