import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


export default class Login extends React.Component {

  static navigationOptions = {
    drawerLabel: () => null,
    drawerLockMode: 'locked-closed',
  };

  constructor(){
    super();
    this.state = {  identifier: "", 
                    password: "",
                    loading: false,
                    disabled: false 
                  }
  }

  saveData = () => {
    this.setState({ loading: true, disabled: true }, () => {
      fetch('http://35.234.156.204/auth/local', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier : "cagdas",//this.state.identifier,
            password : "Cgds1996"//this.state.password
        })
      }).then((response) => response.json()).then((responseJson) => {
            this.setState({ loading: false, disabled: false });
            if ( "error" in responseJson ){
              alert("Wrong username/email or password!");
            }
            else{
              this.props.navigation.navigate('Home');
            }
        }).catch((error) => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require("../assets/images/logo.png")} />
        </View>
        <View style={styles.boxes}>
          <Text style={{marginBottom:3}}>Username:</Text>
          <TextInput 
            style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:1, borderRadius:3,
                    marginBottom:15}}
            onChangeText = {(text) => this.setState({ identifier: text })}
          />
          <Text style={{marginBottom:3}}>Password:</Text>
          <TextInput
            style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:1, borderRadius:3,
                    marginBottom:15}}
            onChangeText = {(text) => this.setState({ password: text })}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={{backgroundColor:"#ccc", width:90, padding:5, margin:10, borderWidth:1, borderRadius:3}}
              onPress={ this.saveData /*this.props.navigation.navigate('Home')*/}
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
          <TouchableOpacity onPress={ () => this.props.navigation.navigate('Recovery') }>
            <Text 
              style={{color:"#222288"}}
              >Did you forget your password?
            </Text>
          </TouchableOpacity>
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