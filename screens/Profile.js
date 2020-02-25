import React from 'react';
import { View, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import theme from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';

export default class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state={
            user:{}
        };
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

    async componentWillMount(){
        user = await this._retrieveData('user');
        userjsoned = JSON.parse(user);
        this.setState({user:userjsoned.user})
        console.log(this.state.user);
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:theme.COLORS.SEASHELL}}>
                <View style={{backgroundColor:theme.COLORS.DIAMOND, height:120}}>
                <TouchableOpacity style={{alignItems:'center', justifyContent:'center', margin:10, width:50, height:50,
                    borderRadius:25, marginTop:30, backgroundColor:theme.COLORS.JAPANESE_INDIGO}} 
                    onPress= {() => this.props.navigation.toggleDrawer()}>
                    <Ionicons name="md-menu" color={theme.COLORS.SEASHELL} size={35}/>
                </TouchableOpacity>
                <View style={{alignItems:'center'}}>
                    <Ionicons name="md-contact" size={150} style={{color:theme.COLORS.LAPIS_LAZULI}} />
                </View>
                </View>
                <ScrollView style={{flex:1, marginHorizontal:40, marginTop:130}}>
                    <Text style={{marginBottom:5, color:theme.COLORS.JAPANESE_INDIGO}}>T.C. number </Text>
                    <TextInput style={{borderWidth:1, borderRadius:3, borderColor:theme.COLORS.JAPANESE_INDIGO,
                        backgroundColor:"lightgray", marginBottom:5, paddingLeft:5}} value={this.state.user.tcNo} editable={false}/>
                    <Text style={{marginBottom:5, color:theme.COLORS.JAPANESE_INDIGO}}>Name </Text>
                    <TextInput style={{borderWidth:1, borderRadius:3, borderColor:theme.COLORS.JAPANESE_INDIGO,
                        backgroundColor:"lightgray", marginBottom:5, paddingLeft:5}} value={this.state.user.name} editable={false}/>
                    <Text style={{marginBottom:5, color:theme.COLORS.JAPANESE_INDIGO}}>Surname </Text>
                    <TextInput style={{borderWidth:1, borderRadius:3, borderColor:theme.COLORS.JAPANESE_INDIGO,
                        backgroundColor:"lightgray", marginBottom:5, paddingLeft:5}} value={this.state.user.surname} editable={false}/>
                    <Text style={{marginBottom:5, color:theme.COLORS.JAPANESE_INDIGO}}>Username </Text>
                    <TextInput style={{borderWidth:1, borderRadius:3, borderColor:theme.COLORS.JAPANESE_INDIGO,
                        backgroundColor:"white", marginBottom:5, paddingLeft:5}} value={this.state.user.username}/>
                    <Text style={{marginBottom:5, color:theme.COLORS.JAPANESE_INDIGO}}>E-mail </Text>
                    <TextInput style={{borderWidth:1, borderRadius:3, borderColor:theme.COLORS.JAPANESE_INDIGO,
                        backgroundColor:"white", marginBottom:5, paddingLeft:5}} value={this.state.user.email}/>
                    <Text style={{marginBottom:5, color:theme.COLORS.JAPANESE_INDIGO}}>Phone </Text>
                    <TextInput style={{borderWidth:1, borderRadius:3, borderColor:theme.COLORS.JAPANESE_INDIGO,
                        backgroundColor:"white", marginBottom:5, paddingLeft:5}} value={this.state.user.phone}/>
                    <TouchableOpacity style={{marginHorizontal:70, marginVertical:30, alignItems:'center', backgroundColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <Text style={{color:theme.COLORS.SEASHELL, padding:5, fontWeight:'bold'}}>SAVE</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
};