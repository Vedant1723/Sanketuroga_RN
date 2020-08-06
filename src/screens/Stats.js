import Voice from '@react-native-community/voice';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  PermissionsAndroid,
  View,
} from 'react-native';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import React, {useContext, useEffect, useState} from 'react';

import {AuthContext} from '../../Context';
import {LineChart} from 'react-native-svg-charts';
import Moment from 'react-moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

let {width} = Dimensions.get('window');

let countrySelected = '';

let crit = 0;
let death = 0;
let reco = 0;

function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

const Stats = ({navigation}) => {
  const {
    authContext: {loadUser},
    state: {user},
  } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
    const getWorldCases = async () => {
      const repo = await axios.get(
        'https://corona.lmao.ninja/v2/all?yesterday=false',
      );

      const repoYes = await axios.get(
        ' https://corona.lmao.ninja/v2/all?yesterday=true',
      );

      const repoChart = await axios.get('https://api.covid19api.com/world');

      let coronaData = [];
      let dData = [];
      let rData = [];

      repoChart.data.map((d) => coronaData.push(d.TotalConfirmed));
      repoChart.data.map((d) => dData.push(d.TotalDeaths));
      repoChart.data.map((d) => rData.push(d.TotalRecovered));

      coronaData.reverse();
      coronaData = coronaData.slice(coronaData.length - 10, coronaData.length);

      dData.reverse();
      dData = dData.slice(dData.length - 10, dData.length);

      rData.reverse();
      rData = rData.slice(rData.length - 10, rData.length);

      setDeathtData(dData);
      setRecoverData(rData);

      setChartData(coronaData);

      let world = repo.data;

      let diff, d1;
      diff = repo.data.critical - repoYes.data.critical;
      d1 = (diff / repoYes.data.critical) * 100;
      crit = parseFloat(d1).toFixed(2);

      let diff2, d2;
      diff2 = repo.data.recovered - repoYes.data.recovered;
      d2 = (diff2 / repoYes.data.recovered) * 100;
      reco = parseFloat(d2).toFixed(2);

      let diff3, d3;

      diff3 = repo.data.deaths - repoYes.data.deaths;
      d3 = (diff3 / repoYes.data.deaths) * 100;
      death = parseFloat(d3).toFixed(2);

      setWcases({
        totalCases: addCommas(world.cases),
        totalDeaths: addCommas(world.deaths),
        active: addCommas(world.active),
        totalRecovered: addCommas(world.recovered + world.deaths),
      });
    };
    getWorldCases();
  }, []);

  async function cCases() {
    let coronaData = [];
    let dData = [];
    let rData = [];

    const repo = await axios.get(
      ' https://corona.lmao.ninja/v2/countries/' +
        countrySelected +
        '?yesterday=false&strict=true&query',
    );

    const repoYes = await axios.get(
      ' https://corona.lmao.ninja/v2/countries/' +
        countrySelected +
        '?yesterday=true&strict=true&query',
    );
    //https://api.covid19api.com/total/country/south-africa

    const repoChart = await axios.get(
      'https://api.covid19api.com/total/country/' + countrySelected,
    );

    repoChart.data.map((d) => coronaData.push(d.Active));
    repoChart.data.map((d) => dData.push(d.Deaths));
    repoChart.data.map((d) => rData.push(d.Recovered));

    coronaData = coronaData.slice(coronaData.length - 10, coronaData.length);

    dData = dData.slice(dData.length - 10, dData.length);

    rData = rData.slice(rData.length - 10, rData.length);

    setDeathtData(dData);
    setRecoverData(rData);

    setChartData(coronaData);

    countrySelected = countrySelected + "'s";

    let diff, d1;
    diff = repo.data.critical - repoYes.data.critical;
    d1 = (diff / repoYes.data.critical) * 100;
    crit = parseFloat(d1).toFixed(2);

    let diff2, d2;
    diff2 = repo.data.recovered - repoYes.data.recovered;
    d2 = (diff2 / repoYes.data.recovered) * 100;
    reco = parseFloat(d2).toFixed(2);

    let diff3, d3;

    diff3 = repo.data.deaths - repoYes.data.deaths;
    d3 = (diff3 / repoYes.data.deaths) * 100;
    death = parseFloat(d3).toFixed(2);

    setWcases({
      totalCases: addCommas(repo.data.cases),
      totalDeaths: addCommas(repo.data.deaths),
      active: addCommas(repo.data.active),
      totalRecovered: addCommas(repo.data.recovered + repo.data.deaths),
    });
  }

  async function wCases() {
    const repo = await axios.get(
      'https://corona.lmao.ninja/v2/all?yesterday=false',
    );

    const repoYes = await axios.get(
      ' https://corona.lmao.ninja/v2/all?yesterday=true',
    );

    const repoChart = await axios.get('https://api.covid19api.com/world');

    let coronaData = [];
    let dData = [];
    let rData = [];

    repoChart.data.map((d) => coronaData.push(d.TotalConfirmed));
    repoChart.data.map((d) => dData.push(d.TotalDeaths));
    repoChart.data.map((d) => rData.push(d.TotalRecovered));

    coronaData.reverse();
    coronaData = coronaData.slice(coronaData.length - 10, coronaData.length);

    dData.reverse();
    dData = dData.slice(dData.length - 10, dData.length);

    rData.reverse();
    rData = rData.slice(rData.length - 10, rData.length);

    setDeathtData(dData);
    setRecoverData(rData);

    setChartData(coronaData);

    let diff, d1;
    diff = repo.data.critical - repoYes.data.critical;
    d1 = (diff / repoYes.data.critical) * 100;
    crit = parseFloat(d1).toFixed(2);

    let diff2, d2;
    diff2 = repo.data.recovered - repoYes.data.recovered;
    d2 = (diff2 / repoYes.data.recovered) * 100;
    reco = parseFloat(d2).toFixed(2);

    let diff3, d3;

    diff3 = repo.data.deaths - repoYes.data.deaths;
    d3 = (diff3 / repoYes.data.deaths) * 100;
    death = parseFloat(d3).toFixed(2);

    let world = repo.data;

    setWcases({
      totalCases: addCommas(world.cases),
      totalDeaths: addCommas(world.deaths),
      active: addCommas(world.active),
      // eslint-disable-next-line radix
      totalRecovered: addCommas(world.recovered + world.deaths),
    });
  }

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [countries, setCountries] = useState([]);
  const [flag, setFlag] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [deathData, setDeathtData] = useState([]);
  const [recoveredData, setRecoverData] = useState([]);
  const [wcases, setWcases] = useState([
    {
      totalCases: '--------',
      todayCases: '--------',
      totalDeaths: '--------',
      todayDeaths: '--------',
      totalRecovered: '--------',
      todayRecovered: '--------',
      active: '--------',
      critical: '--------',
    },
  ]);

  let con = [];

  const getCountries = async () => {
    ToastAndroid.show(
      'Loading List....',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    const res = await axios.get(
      'https://corona.lmao.ninja/v2/countries?yesterday&sort',
    );
    res.data.map((d) =>
      con.push({
        country: d.country,
        flag: d.countryInfo.flag,
      }),
    );
    setCountries(con);
  };

  const [filteredCountries, setFilteredCountries] = useState(null);

  const filterCountries = (text) => {
    setFilteredCountries(
      countries.filter((country) => country.country.includes(text)),
    );
  };

  speachToText = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Sanketuroga',
        message: 'Sanketuroga wants to access your MicroPhone ',
      },
    );
    console.log(granted);
    let results;
    
    if(granted=='granted'){ 
      // try {
      //   const res = await Voice.
      //   console.log("lund",res)
      // } catch (e) {
      //   console.error(e);
      // }
      Voice.onSpeechStart=(e)=>{
        console.log("Speach Started")
      }
      // Voice.onSpeechRecognized=(e)=>{
      //   console.log("Speech Recognized")
      // }
      // Voice.onSpeechResults=(e)=>{
      //   results=e.value;
      // }
      console.log("Results:::",results);
    }
  };

  const Item = ({title, urlToImage}) => {
    return (
      <>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            borderStyle: 'solid',
            marginHorizontal: 20,
            borderBottomColor: '#c8c8c8',
            borderBottomWidth: 0.2,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          onPress={() => {
            countrySelected = title;
            cCases();
            setModalVisible(false);
            setFilteredCountries(null);
          }}>
          <Image
            style={{width: 40, height: 30, borderRadius: 5}}
            source={{uri: `${urlToImage}`}}
          />
          <Text style={{marginHorizontal: 15, fontSize: 15}}>{title}</Text>
        </TouchableOpacity>
      </>
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
              }}
            />
            <TouchableOpacity
              underlayColor="transparent"
              onPress={() => navigation.openDrawer()}
              style={{
                position: 'absolute',
                width: 50,
                height: 50,
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
            </TouchableOpacity>
            <Modal
              onShow={() => getCountries()}
              visible={modalVisible}
              animationType="slide">
              <View style={{backgroundColor: '#f6f6ff'}}>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    margin: 15,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    countrySelected = 'Worldwide';
                    wCases();
                    setFilteredCountries(null);
                  }}>
                  <Image
                    source={require('../assets/close.png')}
                    style={{height: 30, width: 30, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: 10,
                    marginHorizontal: 20,
                    height: 56,
                    backgroundColor: 'white',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',

                    borderRadius: 10,
                  }}>
                  <TextInput
                    style={{width: '80%'}}
                    placeholder="Search"
                    onChangeText={(text) => filterCountries(text)}
                  />
                  <View
                    style={{
                      borderLeftColor: '#e6dfd7',
                      borderLeftWidth: 1,
                      height: 30,
                    }}></View>
                  <TouchableOpacity onPress={() => speachToText()}>
                    <Image
                      source={require('../assets/mic.png')}
                      style={{height: 30, width: 30, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <SafeAreaView>
                <FlatList
                  data={filteredCountries ? filteredCountries : countries}
                  renderItem={({item}) => (
                    <Item title={item.country} urlToImage={item.flag} />
                  )}
                />
              </SafeAreaView>
            </Modal>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
          <View style={{marginTop: -130}}>
            <View
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                {countrySelected == ''
                  ? 'Worldwide Cases'
                  : countrySelected + ' Cases'}
              </Text>
              <Text style={{color: 'white', fontSize: 13}}>
                <Moment element={Text} format="MMMM Do YYYY, HH:mm">
                  {new Date()}
                </Moment>
              </Text>
              <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
                {wcases.totalCases}
              </Text>
            </View>
            <View style={styles.card}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.titleText}>DEATHS</Text>
                <Text style={styles.numText}>{wcases.totalDeaths}</Text>
                <LineChart
                  style={{
                    height: 20,
                    width: 100,
                    shadowColor: 'rgb(255,139,181)',
                    elevation: 10,
                    shadowOpacity: 0.12,
                    shadowOffset: {height: 10, width: 0},
                    shadowRadius: 60,
                  }}
                  data={deathData}
                  svg={{
                    strokeWidth: 2,
                    stroke: 'rgb(255,139,181)',
                  }}></LineChart>
                <View>
                  {/* <LineChart
                  data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100
                        ]
                      }
                    ]
                  }}
                  width={200} // from react-native
                  height={50}
                  chartConfig={{
                    backgroundGradientFrom: "#1E2923",
                    backgroundGradientTo: "#1E2923",
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,

                  }}
                  bezier
                  // style={{
                  //   width: "100%",
                  //   backgroundColor: "blue",
                  //   marginVertical: 8,
                  //   // borderRadius: 16
                  // }}
                  /> */}
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/p8.png')}
                    style={{height: 10, width: 10, marginRight: 5}}
                  />
                  <Text>{crit >= 0 || 'NaN' ? '+' + crit : '-' + crit}%</Text>
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
                    style={{height: 10, width: 10, marginRight: 5}}
                  />
                  <Text>{crit >= 0 || 'NaN' ? '+' + crit : '-' + crit}%</Text>
                </View>
                <Text style={{color: '#c8c8c8'}}>Critical</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.titleText}>ACTIVE CASES</Text>
                <Text style={styles.numText}>{wcases.active}</Text>
                <LineChart
                  style={{
                    height: 20,
                    width: 100,
                    shadowColor: 'rgb(255,139,181)',
                    elevation: 10,
                    shadowOpacity: 0.12,
                    shadowOffset: {height: 10, width: 0},
                    shadowRadius: 60,
                  }}
                  data={chartData}
                  svg={{
                    strokeWidth: 2,
                    stroke: 'rgb(255,139,181)',
                  }}></LineChart>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/p8.png')}
                    style={{height: 10, width: 10, marginRight: 5}}
                  />
                  <Text>{crit >= 0 || 'NaN' ? '+' + crit : '-' + crit}%</Text>
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
                    style={{height: 10, width: 10, marginRight: 5}}
                  />
                  <Text>{crit >= 0 || 'NaN' ? '+' + crit : '-' + crit}%</Text>
                </View>
                <Text style={{color: '#c8c8c8'}}>Critical</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.titleText}>CLOSED CASES</Text>
                <Text style={styles.numText}>{wcases.totalRecovered}</Text>
                <LineChart
                  style={{
                    height: 20,
                    width: 100,
                    shadowColor: 'rgb(255,139,181)',
                    elevation: 10,
                    shadowOpacity: 0.12,
                    shadowOffset: {height: 10, width: 0},
                    shadowRadius: 60,
                  }}
                  data={recoveredData}
                  svg={{
                    strokeWidth: 2,
                    stroke: 'rgb(255,139,181)',
                  }}></LineChart>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/p8.png')}
                    style={{height: 10, width: 10, marginRight: 5}}
                  />
                  <Text>{reco >= 0 || 'NaN' ? '+' + reco : '-' + reco}%</Text>
                </View>
                <Text style={{color: '#c8c8c8'}}>Recovered</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/p7.png')}
                    style={{height: 10, width: 10, marginRight: 5}}
                  />
                  <Text>
                    {death >= 0 || 'NaN' ? '+' + death : '-' + deathx}%
                  </Text>
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
            showsHorizontalScrollIndicator={false}
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
