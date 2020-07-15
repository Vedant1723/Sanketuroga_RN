import {Button, Image, PermissionsAndroid, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

import {AuthContext} from '../../Context';
import ImagePicker from 'react-native-image-picker';
import userImage from '../assets/user.png';

const Profile = () => {
  const {
    authContext: {loadUser, updateProfile},
    state: {user},
  } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(user ? user.firstName : '');
  const [lastName, setLastName] = useState(user && user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);

  useEffect(() => {
    loadUser();
  }, []);

  const [edit, setEdit] = useState(false);
  const [image,setImage] = useState('https://i.ibb.co/2nJgT4M/user.png')
  const [imageUri, setImageUri] = useState('https://i.ibb.co/2nJgT4M/user.png');

  const pickImage = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Sanketuroga',
        message: 'Sanketuroga wants to access your Gallery ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ImagePicker.showImagePicker((response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // const source = {uri: response.uri};

          // You can also display the image using data:
          const source = response;
          setImageUri(source);
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          console.log('SOurce Image::', source);
        }
      });
    } else {
      console.log('Permission not granted!');
    }
  };

  const onSubmit = () => {
    const data = new FormData();
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    if (imageUri) {
      data.append('photo', imageUri.data);
    }
    console.log(data);
    updateProfile(data);
  };

  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <View
        style={{
          height: 56,
          width: '100%',
          backgroundColor: 'white',
          elevation: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          backgroundColor: '#000027',
        }}>
        <TouchableOpacity>
          <Image
            source={require('../assets/back.png')}
            style={{height: 30, width: 30, tintColor: 'white'}}></Image>
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'white'}}>Profile</Text>
        <TouchableOpacity
          onPress={() => setEdit(!edit)}
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
            alignContent: 'flex-end',
          }}>
          <Text style={{fontSize: 17, color: 'white'}}>
            {edit ? 'X' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            height: '50%',
            width: '100%',
            backgroundColor: '#000027',
            bottom: 10,
          }}>
          <TouchableOpacity disabled={!edit} onPress={() => pickImage()}>
            <Image
              source={{uri: image}}
              style={{
                height: 250,
                width: 300,
                resizeMode: 'contain',
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 56,
            borderWidth: 1,
            borderColor: '#7877fe',
            margin: 10,
            borderRadius: 10,
          }}>
          <TextInput
            editable={edit}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First Name"
            value={firstName}
            style={{height: '100%', width: '100%'}}></TextInput>
        </View>
        <View
          style={{
            height: 56,
            borderWidth: 1,
            borderColor: '#7877fe',
            margin: 10,
            borderRadius: 10,
          }}>
          <TextInput
            editable={edit}
            onChangeText={(text) => setLastName(text)}
            placeholder="Last Name"
            value={lastName}
            style={{height: '100%', width: '100%'}}></TextInput>
        </View>

        <View
          style={{
            height: 56,
            borderWidth: 1,
            borderColor: '#7877fe',
            margin: 10,
            borderRadius: 10,
          }}>
          <TextInput
            editable={false}
            value={phoneNumber}
            placeholder="Mobile No."
            style={{height: '100%', width: '100%'}}></TextInput>
        </View>

        <TouchableOpacity
          onPress={() => onSubmit()}
          style={{
            backgroundColor: '#7877fe',
            borderRadius: 10,
            padding: 15,
            margin: 10,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#7877fe',
            borderRadius: 10,
            padding: 15,
            margin: 10,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
