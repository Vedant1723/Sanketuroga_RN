import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
let {width} = Dimensions.get('window');

const Info = () => {
  return (
    <ScrollView>
      {/* Coronavirus Card View */}
      <View
        style={{
          backgroundColor: '#fff',
          margin: 15,
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{backgroundColor: '#7877fe', margin: 10, borderRadius: 100}}>
          <Image
            source={require('../assets/corona.png')}
            style={{
              height: 50,
              width: 50,
              tintColor: 'white',
              margin: 10,
              resizeMode: "contain"
            }}></Image>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontWeight: 'bold'}}>Coronavirus Test Request</Text>
            </View>
            <View>
              <Text style={{fontWeight: 'bold',color: '#7877fe'}}>&nbsp;&nbsp;></Text>
            </View>
          </View>
          <Text style={{color: '#c8c8c8'}}>Sample Text here Sample</Text>
        </View>
      </View>
      {/* End and One View is left */} 
      {/* Symptoms View */}
      <View>
      <View style={{width: width}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
            marginRight: 20,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 17}}>Symptoms</Text>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: '#c8c8c8'}}>
            More >
          </Text>
        </View>
      </View>
      <ScrollView
          horizontal={true}
          contentContainerStyle={{display: 'flex', flexDirection: 'row'}}>
            <View style={{ width: 120, height: 150 }}>
              <Image style={{ marginRight: 0, width:125, height:200}} source={require("../assets/prevention1.png") } />
            </View>
            <View style={{  width: 120, height: 150 }}>
              <Image style={{ marginRight: 0, width:125, height:200 }} source={require("../assets/prevention2.png") } />
            </View>
            <View style={{ width: 120, height: 150 }}>
              <Image style={{ marginRight: 0, width:125, height:200 }} source={require("../assets/prevention3.png") } />
              </View>
       </ScrollView>
       </View>
      {/* End */}


          {/* Prevention View */}
      <View style={{width: width, marginTop:10}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
            marginRight: 20,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 17}}>Prevention</Text>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: '#c8c8c8'}}>
            More >
          </Text>
        </View>
      
      <ScrollView
          horizontal={true}
          style={{display: 'flex', flexDirection: 'row',padding:0,margin:0}}>
            <View style={{  display: 'flex', flexDirection: "column", justifyContent: "space-around", marginTop: 10, alignItems: "center",  borderRadius: 15}}>
              <Image style={{ marginRight: 10, width:100, height:150}} source={require("../assets/pvent1.png") } />
             
            </View>
            <View style={{  display: 'flex', flexDirection: "column", justifyContent: "space-around", marginTop: 10, alignItems: "center",  borderRadius: 15}}>
              <Image style={{ marginRight: 10, width:100, height:150 }} source={require("../assets/pvent2.png") } />
             
            </View>
            <View style={{  display: 'flex', flexDirection: "column", justifyContent: "space-around", marginTop: 10, alignItems: "center",  borderRadius: 15}}>
              <Image style={{ marginRight: 10, width:100, height:150 }} source={require("../assets/pvent3.png") } />
             
            </View>
            <View style={{  display: 'flex', flexDirection: "column", justifyContent: "space-around", marginTop: 10, alignItems: "center",  borderRadius: 15}}>
              <Image style={{ marginRight: 10, width:110, height:150 }} source={require("../assets/pvent4.png") } />
             
            </View>
       </ScrollView>
       </View>
       {/* End */}
       {/* Start */}
       <View style={{display:"flex",flexDirection:"column",marginLeft:20, marginTop: 20}}>
       <View style={{marginTop:10}}>
         <Text style={{fontWeight:"bold",fontSize:17}}>Helpline Number</Text>
       </View>
         <View style={{display:"flex",flexDirection:"row",marginTop:5}}>
           <Text style={{textDecorationLine:"underline",marginRight:10}}>
            +919013151515
           </Text>
           <Text style={{color:"#7877fe"}}>
             (India)
           </Text>
         </View>
         <View style={{display:"flex",flexDirection:"row",marginTop:5}}>
         <Text style={{textDecorationLine:"underline",marginRight:10}}>
            011-22307145
           </Text>
           <Text style={{color:"#7877fe"}}>
             (Delhi)
           </Text>
         </View>
         <View style={{display:"flex",flexDirection:"row",marginTop:5}}>
         <Text style={{textDecorationLine:"underline",marginRight:10}}>
            18001805145
           </Text>
           <Text style={{color:"#7877fe"}}>
             (Noida)
           </Text>
         </View>
       </View>
       {/* End */}
    </ScrollView>
  );
};

export default Info;
