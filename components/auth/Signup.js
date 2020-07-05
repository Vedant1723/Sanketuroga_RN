import React, {useState} from 'react';
import axios from "axios"
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import SimpleToast from 'react-native-simple-toast';

const Signup = ({ navigation }) => {

  const [phoneNumber, setPhoneNumber] = useState()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] =  useState("")

  const submitCred = async () => {
    if(!phoneNumber || !password ){
      SimpleToast.show("Please enter all the required fields")
    }
    if(password != confirmPassword){
      SimpleToast.show("Passwords do not match")
    }
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phoneNumber, password })
    }
    try {
      const res = await axios.post("http://192.168.0.107:5000/api/signup", {phoneNumber, password}, config)
      await AsyncStorage.setItem("token", res.data.token)
    } catch (error) {
      setPhoneNumber()
      setPassword("")
      setConfirmPassword("")
      SimpleToast.show(error.response.data.error)
    }
  }

  return (
    <ScrollView>
      <View style={{justifyContent: 'center', display: 'flex', margin: 0,}}>
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
          <Text style={{fontWeight: 'light', color: '#808080', fontSize: 15}}>
            Caring for Future
          </Text>
        </View>
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
              onChangeText = {(text) => setPhoneNumber(text)}
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
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                style={{marginLeft: 5, width: '100%'}}></TextInput>
            
              <View style={{position: 'absolute', right: 0}}>
                <Image
                  source={require('../assets/eye.png')}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              </View>
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
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                placeholder="Confirm Password"
                style={{marginLeft: 5, width: '100%'}}></TextInput>
            
              <View style={{position: 'absolute', right: 0}}>
                <Image
                  source={require('../assets/eye.png')}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              </View>
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


      
          <View style={{display:"flex",alignItems:"center",marginTop:20}}>
            <Text style={{color:"#808080"}}>+ Add Fingerprint</Text>
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
