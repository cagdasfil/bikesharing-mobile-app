import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React from 'react';
import {Button,Icon} from 'react-native-elements';
import Geojson from 'react-native-geojson';
import MapView,{Marker,MapViewAnimated} from 'react-native-maps';
import theme from '../../constants/Theme';
import {AsyncStorage} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { TouchableOpacity } from 'react-native-gesture-handler';
var defaultRegion = {
            "latitude": 0,
            "longitude": 0,
            latitudeDelta: 0,
            longitudeDelta: 0
};
var featurf= null;
export default class Dockers extends React.Component{
  constructor (props) {
    super(props);
    this.state={
        virtualZones:{
          type: 'FeatureCollection',
          features:[],
        },
        markers:[],
        region: defaultRegion,
        closestZone:{
          latitude:0,
          longitude:0
        },
        flag:0,
    };}

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
  findClosestZone  = async () => {
    this.setState({ loading: true, disabled: true ,responseJS: ""}, () => {
      fetch('http://35.234.156.204/dockers/closestZone/'+JSON.stringify(this.state.region),{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).then( async (responseJson) => {
            this.setState({ loading: false, disabled: false });
            console.log(responseJson);
            this.setState({closestZone:{

              latitude:responseJson.geometry.coordinates[1],
              longitude:responseJson.geometry.coordinates[0],
            }})
            this.setState({flag:1});

        }).catch((error) => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
    })
  }
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
                key:result.currentDocker.id,
                type: result.currentDocker.coordinates.type,
                properties:result.currentDocker.coordinates.properties,
                geometry:result.currentDocker.coordinates.geometry,
                center:result.center,
                number: result.availableBikeNumber,
              }))
              
              this.setState(features.map((zones)=>(
                this.state.virtualZones.features.push(zones)
              )))

              const markers = this.state.virtualZones.features.map((result) => ({
                key:result.key,
                title:result.properties.name,
                center:{
                  latitude:result.center.geometry.coordinates[1],
                  longitude:result.center.geometry.coordinates[0]
                },
                number:result.number,
              }))
              this.setState({markers});
        }).catch((error) => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
    })
  }
  currentLocationButton = async () => {
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        this.setState({
          region: {
            "latitude": position.coords.latitude,
            "longitude": position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
        });
      },
      {enableHighAccuracy:false,timeout:20000,maximumAge:1000}
    )
    console.log(this.state.region);
  };
  componenWillMount () {
    this.interval = setInterval(() => this.getBikes(), 1000); // amount reload every 10 secs.
  };

componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
        });
      },
      {enableHighAccuracy:false,timeout:20000,maximumAge:1000}
    )
        this._storeData("position", JSON.stringify(this.state.region));
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
                showsUserLocation={true}
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
                strokeWidth={3}
              />
              {
               this.state.markers.map(marker  =>  ( 
                  <Marker 
                    key={marker.key}
                    coordinate={marker.center}
                    title={marker.title}
                  >
                    <View style={styles.marker}>
                      <Text style={{color:theme.COLORS.SEASHELL, fontWeight:'bold', fontSize:18}}>{marker.number}</Text>
                    </View>
                </Marker>
              ))}
              {this.state.flag ? 
                <MapViewDirections
                apikey={'AIzaSyCxHq6S9wuGx5vrz_OxlTrReomRkMVDtdc'}
                origin = {this.state.region}
                destination = {this.state.closestZone}
                strokeWidth={3}
                strokeColor="hotpink"
                mode = "WALKING"
                />
                :null
              }
             </MapView>
             <Button
                onPress={this.findClosestZone}
                icon = {<Icon type='material-community' name='find-replace' size={30}></Icon>}
                buttonStyle={{backgroundColor:'white', borderRadius:50} }
                containerStyle={{position:'absolute',bottom:'24%',right:'7%'}}
                 >
                </Button>
              <Button
                onPress={this.currentLocationButton}
                icon = {<Icon type='material-community' name='crosshairs-gps' size={30}></Icon>}
                buttonStyle={{backgroundColor:'white', borderRadius:50} }
                containerStyle={{position:'absolute',bottom:'12%',right:'7%'}}
                 >
              </Button>
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