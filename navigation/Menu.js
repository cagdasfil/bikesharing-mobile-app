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
    <View flex={0.05} style={styles.header}>
      <Image style={styles.logo} source={require("../assets/images/default_profile_picture.jpg")} />
      <Text style={{fontWeight:'bold'}}>{username}</Text>
    </View>
    <View flex={1}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerItems {...props} />
        <TouchableOpacity style={styles.exit} onPress={() => {
            AsyncStorage.clear();
            props.navigation.navigate('Login');
          }}>
          <Text style={{fontSize:16, marginRight:5, color:colortheme.COLORS.JAPANESE_INDIGO}}>EXIT</Text>
          <Ionicons name="md-exit" size={24} color={colortheme.COLORS.JAPANESE_INDIGO} />
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    marginTop: theme.SIZES.BASE * 8,
    marginBottom: theme.SIZES.BASE * 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
      width:150,
      height:150,
      borderRadius:75,
      marginBottom:5
  },
  exit:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10,
  }
});

export default Menu;