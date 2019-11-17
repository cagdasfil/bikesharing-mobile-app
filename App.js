import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require("./images/bikelogo.png")} />
        </View> 
        <View style={styles.login}>
          <View>
            <Text>Username:</Text>
            <TextInput 
              style={{height:30, width:200, backgroundColor:"#fff"}}
            />
            <Text>Password:</Text>
            <TextInput
              style={{height:30, width:200, backgroundColor:"#fff"}}
            />
          </View>
          <View style={styles.button}>
            <Button title="Login"/>
            <Button title="Sign Up"
              onPress={() => this.props.navigation.navigate('SignUp')}
            />
          </View>
          <View>
            <Text style={{color:"#222288"}}>Did you forget your password?</Text>
          </View>
        </View>
      </View>
    );
  }
}

class SignUpScreen extends React.Component {

  constructor()
    {
        super();
 
        this.state = { username: '', password: '', loading: false, disabled: false }
    }



  saveData = () =>
  {
    console.log(this.state.username)
    console.log(this.state.password)
      this.setState({ loading: true, disabled: true }, () =>
      {
          fetch('http://192.168.1.106:3000/user/',
          {
              method: 'POST',
              headers: 
              {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              {
                
                  tcNo:"24566494998",
                  name:"Sezgin",
                  surname:"Dogan",
                  telNo:"05548673698",
                  mail:"abdulkadir.kilavuz@gmail.com",
                  username:this.state.username,
                  password:this.state.password,
                  birthDate: "1993-12-09T22:00:00.000+00:00",
                
                  
              })

          }).then((response) => response.json()).then((responseJson) =>
          {
              alert(responseJson);
              this.setState({ loading: false, disabled: false });
          }).catch((error) =>
          {
              console.error(error);
              this.setState({ loading: false, disabled: false });
          });
      });
  }



  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Username:</Text>
        <TextInput 
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
          onChangeText = {(text) => this.setState({ username: text })}
        />
        <Text>Password:</Text>
        <TextInput
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
          onChangeText = {(text) => this.setState({ password: text })}
        />
        <Text>T.C.:</Text>
        <TextInput
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
        />
        <Text>Name:</Text>
        <TextInput
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
        />
        <Text>Surname:</Text>
        <TextInput
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
        />
        <Text>Phone number:</Text>
        <TextInput
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
        />
        <Text>E-mail:</Text>
        <TextInput
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
        />
        <Text>Birth date:</Text>
        <TextInput
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
        />
        <Button title="Sign Up"
          onPress = { this.saveData }
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#60ec80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    flex: 3,
    justifyContent: 'flex-end',
  },
  login: {
    flex: 2,
    backgroundColor: '#60ec80',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
});
