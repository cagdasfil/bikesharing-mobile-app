import { View, Text} from 'react-native';
import React from 'react';
import theme from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';


export default class UsageCard extends React.Component {
    
    constructor(props){
        super(props);
    }

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

    render() {
        if(this.props.usages.length){
            return (
                <ScrollView>
                {this.props.usages.map(usage  =>  (
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
            );
        }
        else{
            return (
                <View style={{margin:10, alignItems:'center'}}>
                    <Text>There is no usage data!</Text>
                </View>
            );
        }
    }
};