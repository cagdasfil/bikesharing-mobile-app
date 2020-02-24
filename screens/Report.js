import React from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import theme from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

export default class Report extends React.Component{
    render(){
        return(
            <View style={{flex:1, backgroundColor:theme.COLORS.SEASHELL}}>
                <TouchableOpacity style={{alignItems:'center', justifyContent:'center', margin:10, width:50, height:50,
                    borderRadius:25, marginTop:30, backgroundColor:theme.COLORS.JAPANESE_INDIGO}} 
                    onPress= {() => this.props.navigation.toggleDrawer()}>
                    <Ionicons name="md-menu" color={theme.COLORS.SEASHELL} size={35}/>
                </TouchableOpacity>
                <View style={{flex:1, justifyContent:'center', margin:20}}>
                    <Text style={{marginLeft:5, marginBottom:5}}>Title :</Text>
                    <TextInput style={{borderWidth:1, marginBottom:5, paddingLeft:5}}/>
                    <Text style={{marginLeft:5, marginBottom:5}}>Description :</Text>
                    <TextInput style={{borderWidth:1, marginBottom:5, paddingLeft:5}} numberOfLines={8} textAlignVertical={"top"}/>
                    <View style={{flexDirection:'row', alignItems:'center', marginLeft:5}}>
                        <Text>Add an image : </Text>
                        <Ionicons name="md-camera" style={{}} size={30}/>
                    </View>
                    <TouchableOpacity style={{borderWidth:1, marginVertical:30, marginHorizontal:60,
                            flexDirection:"row", alignItems:'center', justifyContent:'center', height:40}}>
                        <Text style={{fontWeight:'bold', fontSize:16}}>SEND</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};