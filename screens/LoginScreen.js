import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


export default class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Login',
    drawerIcon: ({ focused }) => (
      <Ionicons name="md-unlock" size={24} color={focused ? 'blue' : 'black'} />
    ),
    drawerLockMode: 'locked-closed',
  };

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require("../images/logo.png")} />
        </View>
        <View style={styles.boxes}>
          <Text style={{marginBottom:3}}>Username:</Text>
          <TextInput 
            style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:1, borderRadius:3,
                    marginBottom:15}} 
          />
          <Text style={{marginBottom:3}}>Password:</Text>
          <TextInput
            style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:1, borderRadius:3,
                    marginBottom:15}} 
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={{backgroundColor:"#ccc", width:90, padding:5, margin:10, borderWidth:1, borderRadius:3}}
              onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text style={{textAlign:"center", fontWeight:"700"}}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor:"#ccc", width:90, padding:5, margin:10, borderWidth:1, borderRadius:3}}
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            <Text style={{textAlign:"center", fontWeight:"700"}}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forget}>
          <Text 
            style={{color:"#222288"}}
            >Did you forget your password?</Text>
        </View>
      </View>
    );
  }
}

    
const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      flex: 2,
      justifyContent: 'flex-end',
      marginBottom: 40
    },
    boxes: {
      flex: 1,
      justifyContent: 'center',
      marginBottom: 20
    },
    buttons:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    button:{
      height:40,
      width:70,
      margin: 10
    },
    forget:{
      flex:1
    }
});