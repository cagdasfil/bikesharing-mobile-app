import {Text, TextInput, View, Button } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default class SignUp extends React.Component {

  static navigationOptions = {
    drawerLabel: () => null,
    drawerLockMode: 'locked-closed',
  };

  constructor(){
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
                        disabled: false 
                      }
  }
  
  
  saveData = () => {
    this.setState({ loading: true, disabled: true }, () => {
      fetch('http://144.122.192.199:3000/users/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tcNo : this.state.tcNo,
            name : this.state.name,
            surname : this.state.surname,
            phone : this.state.phone,
            eMail : this.state.eMail,
            userName : this.state.username,
            password : this.state.password,
            birthDate : this.state.birthDate
        })
      }).then((response) => response.json()).then((responseJson) => {
            alert(responseJson);
            this.setState({ loading: false, disabled: false });
        }).catch((error) => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
    });
  }

  validate(text, type){

    birthday=/^\d{1,2}\/\d{1,2}\/\d{4}$/
    email=/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
    tc=/^\d{11}$/
    pass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    phone=/^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/

    if(type=='password'){
      if(pass.test(text))
      {
        this.setState({
          passwordValid:true,
          password: text,
        })
      }
      else
      {
        this.setState({
          passwordValid:false,
        })
      }

    }

    else if(type=='phone'){
      if(phone.test(text))
      {
        this.setState({
          phoneValid:true,
          phone: text,
        })
      }
      else
      {
        this.setState({
          phoneValid:false,
        })
      }

    }

    else if(type=='tc'){
      if(tc.test(text))
      {
        this.setState({
          tcValid:true,
          tcNo: text,
        })
      }
      else
      {
        this.setState({
          tcValid:false,
        })
      }

    }

    else if(type=='email'){
      if(email.test(text))
      {
        this.setState({
          eMailValid:true,
          eMail: text,
        })
      }
      else
      {
        this.setState({
          eMailValid:false,
        })
      }

    }

    else if(type=='birthday'){
      if(birthday.test(text))
      {
        this.setState({
          birthDateValid:true,
          birthDate: text,
        })
      }
      else
      {
        this.setState({
          birthDateValid:false,
        })
      }

    }
  }  
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Username</Text>
        <TextInput 
          /*onChangeText={(text)=>this.validate(text, 'username')}*/
          placeholder="Enter Username"
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
          onChangeText = {(text) => this.setState({ username: text })}
        />
        <Text>Password</Text>
        <TextInput
          placeholder="Enter Password"
          style={[{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}, !this.state.passwordValid? {borderWidth:3,borderColor:'red'}:null]}
          onChangeText = {(text) => this.validate(text, 'password')}
          secureTextEntry
        />
        <Text>Confirm Password</Text>
        <TextInput
          placeholder="Repeat Password"
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
          onChangeText = {(text) => this.setState({ password: text })}
          secureTextEntry
        />
        <Text>T.C.</Text>
        <TextInput
          placeholder="eg:(xxx) xxx-xxxx"
          style={[{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}, !this.state.tcValid? {borderWidth:3,borderColor:'red'}:null]}
          onChangeText = {(text) => this.validate(text, 'tc')}
        />
        <Text>Name</Text>
        <TextInput
          placeholder="Enter Name"
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
          onChangeText = {(text) => this.setState({ name: text })}
        />
        <Text>Surname</Text>
        <TextInput
          placeholder="Enter Surname"
          style={{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}}
          onChangeText = {(text) => this.setState({ surname: text })}
        />
        <Text>Phone Number</Text>
        <TextInput
          placeholder="eg:(xxx)xxxxxxx"
          style={[{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}, !this.state.phoneValid? {borderWidth:3,borderColor:'red'}:null]}
          onChangeText = {(text) => this.validate(text, 'phone')}
        />
        <Text>E-mail</Text>
        <TextInput
          placeholder="example@bikesharing.com"
          style={[{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}, !this.state.eMailValid? {borderWidth:3,borderColor:'red'}:null]}
          onChangeText = {(text) => this.validate(text, 'email')}
        />
        <Text>Birth Date</Text>
        <TextInput
          placeholder="DD/MM/YYYY"
          style={[{height:30, width:200, backgroundColor:"#fff", borderColor:"#000", borderWidth:2}, !this.state.birthDateValid? {borderWidth:3,borderColor:'red'}:null]}
          onChangeText = {(text) => this.validate(text, 'birthday')}
        />
        <Button title="Sign Up"
          onPress = { this.saveData }
        />
      </View>
    );
  }
}
  