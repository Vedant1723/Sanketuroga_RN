import React, {Fragment} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Stats from './Stats';
import Nearby from './Nearby';
import {StyleSheet} from 'react-native';
import News from './News';
import Info from './Info';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

const MainFlow = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Stats"
        tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="Stats" component={Stats} />
        {/* <Tab.Screen name="Nearby" component={Nearby} /> */}
        <Tab.Screen name="News" component={News} />
        <Tab.Screen name="Info" component={Info} />
      </Tab.Navigator>
    </>
  );
};

export default MainFlow;
