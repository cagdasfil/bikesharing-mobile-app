import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import React from 'react';
import theme from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import ResetPassword from './ResetPassword';
import { SafeAreaView } from 'react-navigation';
import {AsyncStorage} from 'react-native';


export default class Usages extends React.Component {

    constructor (props) {
        super(props);
        this.state={
            userId: "",
            usages: [],
        }
    };

    formatDate (date) {
        var datestring = 
            " " 
            + ("0" + date.getDate()).slice(-2)  + "/" 
            + ("0" + (date.getMonth() + 1)).slice(-2)+ "/" 
            + date.getFullYear() + " " 
            + ("0" + date.getHours()).slice(-2) + ":" 
            + ("0" + date.getMinutes()).slice(-2);
            return datestring;
    }

    getUsages = async () => {
        this.setState({ loading: true, disabled: true ,responseJS: ""}, () => {
          fetch('http://35.234.156.204/usages/closedSessions/' + this.state.userId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
          }).then((response) => response.json()).then( async (responseJson) => {
                this.setState({ loading: false, disabled: false });
                    const usages = responseJson.data.map((result) => ({
                        key : result.currentUsage.id,
                        createdAt: result.currentUsage.createdAt,
                        duration: (new Date(result.currentUsage.updatedAt) - new Date(result.currentUsage.createdAt))/60000,
                        total: result.currentUsage.totalFee,
                        startDockerName: result.startDocker.address,
                        endDockerName: result.endDocker.address
                    }))
                    
                    this.setState({usages});
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
    }

    _retrieveData = async (dataContainer) => { // takes string input
        try {
          const value = await AsyncStorage.getItem(dataContainer);
          if (value != null){
            return value;
          }
        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
    };

    async componentDidMount () {
        user = await this._retrieveData('user');
        userjsoned = JSON.parse(user);
        this.setState({userId : userjsoned.user._id});
        this.getUsages();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', margin:10, width:50, height:50,
                        borderRadius:25, backgroundColor:theme.COLORS.JAPANESE_INDIGO}} 
                        onPress= {() => this.props.navigation.toggleDrawer()}>
                        <Ionicons name="md-menu" color={theme.COLORS.SEASHELL} size={35}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                {this.state.usages.map(usage  =>  (
                    <View key={usage.key} style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{marginLeft:5}}>
                            <Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>{this.formatDate(new Date(usage.createdAt))}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', marginVertical:10}}>
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Duration: </Text><Text style={{color: '#891705'}}>{parseInt(usage.duration)} min</Text>
                            </View>
                            <View style={{alignItems:'center', flexDirection:'row', marginLeft:25}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Total: </Text><Text style={{color: '#047c16'}}>{usage.total.toFixed(2)}₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>{usage.startDockerName}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-arrow-forward" color={theme.COLORS.JAPANESE_INDIGO}/>
                            </View>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>{usage.endDockerName}</Text>
                            </View>
                        </View>
                    </View>
                ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: theme.COLORS.SEASHELL,
    }
});