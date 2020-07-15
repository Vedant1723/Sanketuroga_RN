import {
  ActivityIndicator,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';

import Moment from 'react-moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

let topNews;
const News = ({navigation}) => {
  const [news, setNews] = useState(null);
  const [top, setTop] = useState({
    content: '',
    description: '',
    title: '',
    url: '',
    urlToImage: '',
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getNews = async () => {
      const res = await axios.get(
        'http://newsapi.org/v2/everything?q=Covid&from=2020-07-09&sortBy=popularity&apiKey=053e422e20954f45ba2b8ef037089b7a',
      );
      setNews(res.data.articles);
      let n = Math.floor(Math.random() * 10);
      topNews = res.data.articles[n];
      const {content, description, title, url, urlToImage} = topNews;
      setTop({...top, content, description, title, url, urlToImage});
      console.log(top);
      setLoading(false);
    };
    getNews();
  }, []);

  const Item = ({title, publishedAt, urlToImage, url}) => {
    return (
      <>
        {loading ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <ActivityIndicator size={50} color="#7877fe" />
          </View>
        ) : (
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 10,
              borderStyle: 'solid',
              marginHorizontal: 10,
              borderBottomColor: '#c8c8c8',
              borderBottomWidth: 0.2,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flex: 1
            }}
            onPress={() => Linking.openURL(`${url}`)}>
            <Image
              style={{width: 100, height: 70, borderRadius: 5}}
              source={{uri: `${urlToImage}`}}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 1,
                marginHorizontal: 10,
              }}>
              <Text style={{marginHorizontal: 10, color: '#f65355'}}>
                <Moment element={Text} fromNow>
                  {publishedAt}
                </Moment>
              </Text>
              <Text style={{marginHorizontal: 10}}>{title}</Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <>
      {loading ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <ActivityIndicator size={50} color="#7877fe" />
          </View>
        ) : (
          <SafeAreaView style={{marginBottom: 106, display: 'flex'}}>
            <View style={{height: '40%'}}>
              <View>
                <Image
                  style={{resizeMode: 'cover', height: '100%'}}
                  source={{uri: `${top.urlToImage}`}}
                />
              </View>
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
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexShrink: 1,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  backgroundColor: 'rgba(52, 52, 52, 0.3)',
                }}>
                <View
                  style={{
                    borderRadius: 20,
                    backgroundColor: '#f65355',
                    marginHorizontal: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      marginHorizontal: 10,
                      marginBottom: 5,
                      marginTop: 5,
                    }}>
                    Highlights
                  </Text>
                </View>
                <View style={{marginBottom: 10}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginHorizontal: 10,
                    }}>
                    {top.title}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{marginBottom: 10}}
                  onPress={() => Linking.openURL(`${top.url}`)}>
                  <Text style={{color: 'white', marginHorizontal: 10}}>
                    Read more >
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginHorizontal: 20,
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  Related News
                </Text>
              </View>
              <FlatList
                data={news && news}
                // keyExtractor={(index) =>  index}
                renderItem={({item}) => (
                  <Item
                    title={item.title}
                    publishedAt={item.publishedAt}
                    urlToImage={item.urlToImage}
                    url={item.url}
                  />
                )}
              />
            </ScrollView>
          </SafeAreaView>
        )}
    </>
  );
};

export default News;
