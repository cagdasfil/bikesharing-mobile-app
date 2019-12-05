import { StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';


export default class Dockers extends React.Component{
    render() {
        return (
          <View style={styles.container}>
            <MapView 
                style={styles.mapStyle}
                initialRegion={{
                    latitude: 39.897053,
                    longitude: 32.778302,
                    latitudeDelta: 0.0422,
                    longitudeDelta: 0,
                  }} />
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
});