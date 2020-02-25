import React from "react";
import { DrawerItems } from "react-navigation-drawer";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
} from "react-native";
import { theme } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import colortheme from '../constants/Theme';

const { width } = Dimensions.get("screen");

const _retrieveData = async (dataContainer) => { // takes string input
  try {
    const value = AsyncStorage.getItem(dataContainer);
    if (value != null){
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};

const retrieveUserName = async () => {
  user =  await _retrieveData("user");
  userjsoned = JSON.parse(user);
  return userjsoned.user.username;
}

let username = "";

const Drawer = props => {
  retrieveUserName().then((result)=>{username=result});
  return (
  <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
    <View style={styles.header}>
      <Ionicons name="md-contact" size={150} color={colortheme.COLORS.LAPIS_LAZULI} onPress={()=>props.navigation.navigate('Profile')} />
      <Text style={{fontWeight:'bold'}}>{username}</Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <DrawerItems {...props} />
      <View style={styles.exit} >
      <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {
          AsyncStorage.clear();
          props.navigation.navigate('Login');
        }}>
        <Text style={{fontSize:16, marginRight:5, fontWeight:'bold', color:colortheme.COLORS.JAPANESE_INDIGO}}>EXIT</Text>
        <Ionicons name="md-exit" size={24} color={colortheme.COLORS.JAPANESE_INDIGO} />
      </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
)};

const Menu = {
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: "white",
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: "darkblue",
    inactiveTintColor: "gray",
    activeBackgroundColor: "transparent",
    itemStyle: {
      width: width * 0.75,
      backgroundColor: "transparent"
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: "normal"
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      overflow: "hidden"
    },
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exit:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10,
  }
});

export default Menu;