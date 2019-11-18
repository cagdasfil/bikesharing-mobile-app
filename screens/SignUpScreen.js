import {Text, TextInput, View, Button } from 'react-native';
import React from 'react';


export default class SignUpScreen extends React.Component {

    constructor()
      {
          super();
   
          this.state = {  username: "", 
                          password: "",
                          tcNo: "",
                          name: "",
                          surname: "",
                          phone: "",
                          eMail: "",
                          birthDate: "",
                          loading: false,
                          disabled: false }
          }
  
  
  
    saveData = () =>
    {
        this.setState({ loading: true, disabled: true }, () =>
        {
            fetch('http://144.122.192.199:3000/users/register',
            {
                method: 'POST',
                headers: 
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  
                   tcNo : this.state.tcNo,
                   name : this.state.name,
                   surname : this.state.surname,
                   phone : this.state.phone,
                   eMail : this.state.eMail,
                   userName : this.state.username,
                   password : this.state.password,
                   birthDate : this.state.birthDate
                    
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
            onChangeText = {(text) => this.setState({ tcNo: text })}
          />
          <Text>Name:</Text>
          <TextInput
            style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
            onChangeText = {(text) => this.setState({ name: text })}
          />
          <Text>Surname:</Text>
          <TextInput
            style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
            onChangeText = {(text) => this.setState({ surname: text })}
          />
          <Text>Phone number:</Text>
          <TextInput
            style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
            onChangeText = {(text) => this.setState({ phone: text })}
          />
          <Text>E-mail:</Text>
          <TextInput
            style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
            onChangeText = {(text) => this.setState({ eMail: text })}
          />
          <Text>Birth date:</Text>
          <TextInput
            style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
            onChangeText = {(text) => this.setState({ birthDate: text })}
          />
          <Button title="Sign Up"
            onPress = { this.saveData }
          />
        </View>
      );
    }
}
  