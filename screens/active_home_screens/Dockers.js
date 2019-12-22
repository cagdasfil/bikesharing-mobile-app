import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React from 'react';
import MapView, { Marker, MapViewAnimated } from 'react-native-maps';
import theme from '../../constants/Theme';

var a1BikeNum = 0;
var a4BikeNum = 0;
var a1Address = null;
var a4Address = null;
export default class Dockers extends React.Component{


  getBikes = async () => {
    this.setState({ loading: true, disabled: true ,responseJS: ""}, () => {
      fetch('http://35.234.156.204/dockers/withBikes', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).then( async (responseJson) => {
            this.setState({ loading: false, disabled: false });
            if ( responseJson.data.length == 2 ){

              const a1 = responseJson.data[0];
              const a4 = responseJson.data[1];
              a1BikeNum = a1.availableBikeNumber;
              a4BikeNum = a4.availableBikeNumber;
              a1Address = a1.currentDocker.address;
              a4Address = a4.currentDocker.address;

              this.setState({responseJS:responseJson});
            }
            else{
              //this.setState("error in dockers");
              
            }
        }).catch((error) => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
    });
  }


  async componentDidMount () {
    this.interval = setInterval(() => this.getBikes(), 1000); // amount reload every 10 secs.
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

    render() {
        return (
          
          <View style={styles.container}
          
          >
            <MapView
                onMapReady = {this.getBikes}
                //onPress = {this.getBikes}
                style={styles.mapStyle}
                initialRegion={{
                    latitude: 39.897053,
                    longitude: 32.778302,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0,
                  }} >
              <Marker
                coordinate={{latitude:39.907216, longitude: 32.783874,}}
                title = {a1Address}
                
              >
                <View style={styles.marker}>
                  <Text style={{color:'white', fontWeight:'bold', fontSize:18}}>{a1BikeNum}</Text>
                </View>
              </Marker>
              <Marker
                coordinate={{latitude:39.891434, longitude: 32.793641,}}
                title = {a4Address}
              >
                <View style={styles.marker}>
                  <Text style={{color:theme.COLORS.SEASHELL, fontWeight:'bold', fontSize:18}}>{a4BikeNum}</Text>
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