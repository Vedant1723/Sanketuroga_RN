import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Info from './Info';
import Stats from './Stats';
import News from './News';
import Nearby from './Nearby';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      tabBarOptions={(props) => <TabBar {...props} style={{ backgroundColor: "red" }} />}>
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Nearby" component={Nearby} />
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Info" component={Info} />
    </Tab.Navigator>
  );
};

export default Home;
