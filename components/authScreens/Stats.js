import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableHighlight,
  SectionList,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Profile from './Profile';
import axios from 'axios';
import Logout from './Logout';
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

let {width} = Dimensions.get('window');
let cName = [];

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
  {
    title: 'Country',
    data: ['Brazzer', 'Ice Cream'],
  },
];

const Stats = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [countries, setCountries] = useState([]);
  const [flag, setFlag] = useState([]);

  // useEffect(() => {
  //   const getCountries = async () => {
  //     const res = await axios.get(
  //       'https://corona.lmao.ninja/v2/countries?yesterday&sort',
  //     );
  //     console.log("REs==>>",res.data.country);
  //     res.data.map((d) =>
  //       setCountries([
  //         {
  //           key: d.country,
  //           countryFlag: d.countryInfo.flag,
  //         },
  //       ]),
  //     );
  //   };
  //   getCountries();
  // }, []);
  let fuck = [];
  const getCountries = async () => {
    console.log('Get the fuckinng countries');
    const res = await axios.get(
      'https://corona.lmao.ninja/v2/countries?yesterday&sort',
    );
    res.data.map((d) =>
      fuck.push({
        country: d.country,
        flag: d.countryInfo.flag,
      }),
    );
    setCountries(fuck);
  };

  setTimeout(() => {
    console.log('FUCKKKK Countries', countries);
  }, 10000);

  const Item = ({country, flag}) => {
    return (
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 10,
          borderStyle: 'solid',
          borderTopColor: 'black',
          borderTopWidth: 1,
          backgroundColor:"red"
        }}
     
        >
        <Image style={{width: 30, height: 30}} source={{uri: `${flag}`}} />
      <Text>{country}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={require('../assets/cough.png')}
              style={{
                resizeMode: 'cover',
                height: width * 0.5 * 1.6,
                width: width,
              }}></Image>
            <TouchableHighlight
              style={{
                position: 'absolute',
                width: 30,
                height: 30,
                left: 10,
                top: 5,
              }}>
              <Image
                style={{
                  position: 'absolute',
                  width: 30,
                  height: 30,
                  left: 20,
                  top: 20,
                }}
                source={require('../assets/menu.png')}
              />
            </TouchableHighlight>
            <Modal
              onShow={() => getCountries()}
              visible={modalVisible}
              animationType="slide">
              <View>
                <Text>Search Bar</Text>
              </View>
              <Text onPress={() => setModalVisible(!modalVisible)}>X</Text>
              <SafeAreaView>
                <FlatList
                  data={countries && countries}
                  // keyExtractor={( index) =>  index}
                  renderItem={({item}) => (
                    <ListItem

                    title={item.country}
                    leftAvatar={{source:{uri:`${item.flag}`}}}
                    onPress={()=>console.log(item.country)}/>
                  )}
                />
                {/* <ScrollView>

                



                  
                  <View style={{display:"flex",flexDirection:"row"}}>
                    <View>
                  {flag && flag.map((n) => <Image style={{height:19.25  ,width:17}} source={{uri: `${n}`}} />)}
                  </View>
                  <View>
                    {countries && countries.map((c) => <Text>{c}</Text>)}
                    </View>
                  </View>
                </ScrollView> */}

                {/* <FlatList
                data={DATA}
              
                renderItem={({item} ) => <ListItem title={item} />}
                
                >
                  
                </FlatList> */}
              </SafeAreaView>
            </Modal>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => setModalVisible(true)}
              style={{
                position: 'absolute',
                width: 50,
                height: 50,
                right: 10,
                top: 5,
              }}>
              <Image
                onPress={() => setModalVisible(true)}
                style={{
                  position: 'absolute',
                  width: 30,
                  height: 30,
                  right: 20,
                  top: 20,
                }}
                source={require('../assets/search.png')}
              />
            </TouchableHighlight>
          </View>
          <View style={{marginTop: -130}}>
            <View
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                Worldwide Cases
              </Text>
              <Text style={{color: 'white', fontSize: 13}}>
                July 2, 2020, 15:07 IST
              </Text>
              <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
                27,65,458
              </Text>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.titleText}>DEATHS</Text>
                <Text style={styles.numText}>1,23,456</Text>
                <Text>~~~~~~~</Text>
              </View>
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/p8.png')}
                    style={{height: 10, width: 10, marginRight: 5}}></Image>
                  <Text>+12.31%</Text>
                </View>
                <Text style={{color: '#c8c8c8'}}>Mild Condition</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/p7.png')}
                    style={{height: 10, width: 10, marginRight: 5}}></Image>
                  <Text>+12.31%</Text>
                </View>
                <Text style={{color: '#c8c8c8'}}>Critical</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.titleText}>ACTIVE CASES</Text>
                <Text style={styles.numText}>1,23,456</Text>
                <Text>~~~~~~~</Text>
              </View>
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/p8.png')}
                    style={{height: 10, width: 10, marginRight: 5}}></Image>
                  <Text>+12.31%</Text>
                </View>
                <Text style={{color: '#c8c8c8'}}>Mild Condition</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/p7.png')}
                    style={{height: 10, width: 10, marginRight: 5}}></Image>
                  <Text>+12.31%</Text>
                </View>
                <Text style={{color: '#c8c8c8'}}>Critical</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.titleText}>CLOSED CASES</Text>
                <Text style={styles.numText}>1,23,456</Text>
                <Text>~~~~~~~</Text>
              </View>
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/p8.png')}
                    style={{height: 10, width: 10, marginRight: 5}}></Image>
                  <Text>+12.31%</Text>
                </View>
                <Text style={{color: '#c8c8c8'}}>Recovered </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/p7.png')}
                    style={{height: 10, width: 10, marginRight: 5}}></Image>
                  <Text>+12.31%</Text>
                </View>
                <Text style={{color: '#c8c8c8'}}>Deaths</Text>
              </View>
            </View>
          </View>
          <View style={{width: width}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 20,
                marginRight: 20,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>
                Requirements
              </Text>
              <Text
                style={{fontWeight: 'bold', fontSize: 15, color: '#c8c8c8'}}>
                More >
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 0,
              margin: 0,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                display: 'flex',
                marginRight: 10,
                marginLeft: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                alignItems: 'center',
                padding: 15,
                borderRadius: 15,
                paddingHorizontal: 20,
              }}>
              <Image
                style={{
                  marginRight: 10,
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../assets/pre1.png')}
              />
              <Text style={{fontSize: 15, color: '#7877fe'}}>GLOVES</Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                display: 'flex',
                marginRight: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                alignItems: 'center',
                padding: 15,
                borderRadius: 15,
                paddingHorizontal: 20,
              }}>
              <Image
                style={{
                  marginRight: 10,
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../assets/pre2.png')}
              />
              <Text style={{fontSize: 15, color: '#7877fe'}}>MASK</Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                display: 'flex',
                marginRight: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                alignItems: 'center',
                padding: 15,
                borderRadius: 15,
                paddingHorizontal: 20,
              }}>
              <Image
                style={{
                  marginRight: 10,
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../assets/pre3.png')}
              />
              <Text style={{fontSize: 15, color: '#7877fe'}}>ALCOHOL</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginBottom: 20,
    width: width * 0.9,
    height: 100,
    borderRadius: 10,
    elevation: 10,
    shadowRadius: 20,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontWeight: 'bold',
    color: '#7877fe',
  },
  numText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  miniCard: {
    backgroundColor: 'white',
    width: 100,
    height: 50,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Stats;
