import React, {useContext, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {AuthContext} from '../../Context';

const CustomDrawerContent = (props) => {
  const {authContext} = useContext(AuthContext);
  const {signOut} = authContext;

  const logout = () => {
    Alert.alert(
      '',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          onPress: () => props.navigation.closeDrawer(),
        },
        {
          text: 'Yes',
          onPress: () => {
            signOut();
            props.navigation.closeDrawer();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <DrawerItemList {...props} />
      </View>
      <DrawerItem label="Logout" onPress={() => logout()} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
