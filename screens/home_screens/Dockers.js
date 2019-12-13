import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React from 'react';
import MapView, { Marker, MapViewAnimated } from 'react-native-maps';
import theme from '../../constants/Theme';


export default class Dockers extends React.Component{
    render() {
        return (
          <View style={styles.container}>
            <MapView 
                style={styles.mapStyle}
                initialRegion={{
                    latitude: 39.897053,
                    longitude: 32.778302,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0,
                  }}>
              <Marker
                coordinate={{latitude:39.907216, longitude: 32.783874,}}
                title="12 bikes are available"
              >
                <View style={styles.marker}>
                  <Text style={{color:'white', fontWeight:'bold', fontSize:18}}>12</Text>
                </View>
              </Marker>
              <Marker
                coordinate={{latitude:39.891434, longitude: 32.793641,}}
                title="17 bikes are available"
              >
                <View style={styles.marker}>
                  <Text style={{color:theme.COLORS.SEASHELL, fontWeight:'bold', fontSize:18}}>17</Text>
                </View>
              </Marker>
            </MapView>
          </View>
        );
    }
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  marker: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: theme.COLORS.JAPANESE_INDIGO,
    borderColor: theme.COLORS.SEASHELL, 
    borderWidth:1,
    width:40,
    height:40,
    borderRadius:20
  }
});