import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import theme from '../constants/Theme';
import { Constants, Permissions, Notifications } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class NotificationsPage extends React.Component{

    _createNotificationAsync = () => {
        Notifications.presentLocalNotificationAsync({
          title: 'New Virtual Zone',
          body: 'There is a new virtual zone in your area. Don\'t forget to check out !',
          android: {
            channelId: 'reminders',
            color: '#23395B',
            icon: "https://img.icons8.com/cotton/64/000000/bicycle--v2.png",
          },
        });
      }

    componentWillMount(){
        this._createNotificationAsync();
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:theme.COLORS.SEASHELL}}>
                <TouchableOpacity style={{alignItems:'center', justifyContent:'center', margin:10, width:50, height:50,
                    borderRadius:25, marginTop:30, backgroundColor:theme.COLORS.JAPANESE_INDIGO}} 
                    onPress= {() => this.props.navigation.toggleDrawer()}>
                    <Ionicons name="md-menu" color={theme.COLORS.SEASHELL} size={35}/>
                </TouchableOpacity>
            </View>
        );
    }
};