import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React from 'react';
import Geojson from 'react-native-geojson';
import MapView from 'react-native-maps';
import theme from '../../constants/Theme';
import {AsyncStorage} from 'react-native';
var defaultRegion = {
            latitude: 39.897053,
            longitude: 32.778302,
            latitudeDelta: 0.0522,
            longitudeDelta: 0,
}
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};
export default class Dockers extends React.Component{
  constructor (props) {
    super(props);
    this.state={
        virtualZones:{
          type: 'FeatureCollection',
          features:[],
        },
        region: defaultRegion,
    };
}
  _storeData = async (dataContainer, data) => { //both parameters are string.
    try {
      await AsyncStorage.setItem(dataContainer, data);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  _retrieveData = async (data) => { // takes string input
    try {
      const value = await AsyncStorage.getItem(data);
      return value;
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

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
            const features = responseJson.data.map((result) => ({
                type: result.currentDocker.coordinates.type,
                properties:result.currentDocker.coordinates.properties,
                geometry:result.currentDocker.coordinates.geometry,
              }))
              
              this.setState(features.map((zones)=>(
                this.state.virtualZones.features.push(zones)
              )));
        }).catch((error) => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
    });
  }


  componenWillMount () {
    this.interval = setInterval(() => this.getBikes(), 1000); // amount reload every 10 secs.
  }

  async componentDidMount() {
    return getCurrentLocation().then(position => {
      if (position) {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
        });
        this._storeData("position", JSON.stringify(this.state.region));
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

    render() {
   
        return (
         
          <View style={styles.container}
          
          >
            <MapView
                showsUserLocation={true}
                onMapReady = {this.getBikes}
                //onPress = {this.getBikes}
                style={styles.mapStyle}
                region={{
                    latitude:this.state.region.latitude,
                    longitude: this.state.region.longitude,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta,
                  }}
              >
              <Geojson 
                geojson={this.state.virtualZones} 
                strokeColor="red"
                fillColor="red"
                strokeWidth={2}
              />
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