import {Text, TextInput, View, Button } from 'react-native';
import React from 'react';


export default class SignUpScreen extends React.Component {

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
  