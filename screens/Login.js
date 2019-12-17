import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import theme from '../constants/Theme';

export default class Login extends React.Component {

  constructor(){
    super();
    this.state = {  identifier: "", 
                    password: "",
                    response:" ",
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
            identifier : this.state.identifier,
            password : this.state.password
        })
      }).then((response) => response.json()).then((responseJson) => {
            this.setState({ loading: false, disabled: false });
            if ( "error" in responseJson ){
              this.setState({response:"Wrong username/email or password!"});
            }
            else{
              console.log(responseJson);
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
        <Image
          style={{width:300, height:60, marginBottom:40, marginTop:70}}
          source={require("../assets/images/logo.png")} />
        <Text style={{color:'red', marginBottom:5}}>{this.state.response}</Text>
        <View style={{flexDirection:'row', alignItems:'center', marginBottom:10,}}>
          <View style={{alignItems:'center', justifyContent:'center', backgroundColor:theme.COLORS.DIAMOND, width:40, height:40}}>
            <Ionicons name='md-person' size={26} color={theme.COLORS.JAPANESE_INDIGO}/>
          </View>
          <TextInput 
            style={{height:40, width:200, backgroundColor:"#fff", paddingLeft:7, color:theme.COLORS.JAPANESE_INDIGO}}
            onChangeText = {(text) => this.setState({ identifier: text })}
            placeholder = "username or e-mail"
          />
        </View>
        <View style={{flexDirection:'row', alignItems:'center', marginBottom:35}}>
          <View style={{alignItems:'center', justifyContent:'center', backgroundColor:theme.COLORS.DIAMOND, width:40, height:40}}>
            <Ionicons name='md-lock' size={26} color={theme.COLORS.JAPANESE_INDIGO}/>
          </View>
          <TextInput
            style={{height:40, width:200, backgroundColor:"#fff", paddingLeft:7, color:theme.COLORS.JAPANESE_INDIGO}}
            onChangeText = {(text) => this.setState({ password: text })}
            placeholder = "password"
            secureTextEntry
          />
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            style={{backgroundColor:theme.COLORS.DIAMOND, justifyContent:'center', width:110, height:40, padding:5, margin:10, }}
            onPress={ this.saveData /*this.props.navigation.navigate('Home')*/}
          >
            <Text style={{textAlign:"center", fontWeight:"700", color:theme.COLORS.JAPANESE_INDIGO}}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor:theme.COLORS.DIAMOND, justifyContent:'center', width:110, height:40, padding:5, margin:10, }}
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            <Text style={{textAlign:"center", fontWeight:"700", color:theme.COLORS.JAPANESE_INDIGO}}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={ () => this.props.navigation.navigate('Recovery') }>
          <Text 
            style={{marginTop:20, color:theme.COLORS.JAPANESE_INDIGO}}
            >Did you forget your password?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

    
const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:'column',
      backgroundColor: theme.COLORS.SEASHELL,
      alignItems: 'center',
      justifyContent: 'center',
    },
});