import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const TabBar = ({navigation, state, descriptors}) => {
  return (
    <View
      style={{
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 56,
        borderRadius: 35,
        padding: 5,
        margin:10,
        elevation: 10,
        backfaceVisibility: 'hidden',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const label2 = label.toLowerCase();

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{
                  uri: `https://img.techpowerup.org/200701/${label2}.png`,
                }}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: isFocused ? '#7877fe' : '#000',
                }}></Image>

              <Text style={{color: isFocused ? '#7877fe' : '#000'}}>
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default TabBar;
