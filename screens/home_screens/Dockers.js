import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React from 'react';
import MapView, { Marker, MapViewAnimated } from 'react-native-maps';
import theme from '../../constants/Theme';


export default class Dockers extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      markers: [],
    };
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
              const markers = responseJson.data.map((result) => ({
                key : result.currentDocker.id,
                title : result.currentDocker.address,
                latlng: {
                  latitude: result.currentDocker.coordinates.latitude,
                  longitude: result.currentDocker.coordinates.longitude,
                },
                number: result.availableBikeNumber,
              }))
              this.setState({markers});
        }).catch((error) => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
    });
  }


  componenDidMount () {
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
                  }} 
              >
              {
               this.state.markers.map(marker  =>  ( 
                  <Marker 
                    key = {marker.key}
                    coordinate={marker.latlng}
                    title={marker.title}
                  >
                    <View style={styles.marker}>
                      <Text style={{color:theme.COLORS.SEASHELL, fontWeight:'bold', fontSize:18}}>{marker.number}</Text>
                    </View>
                </Marker>
              ))}
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