import React, { Fragment, Component } from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {
    View, 
    TouchableOpacity, 
    TextInput, 
    Text, 
    ScrollView, 
    KeyboardAvoidingView,
    StyleSheet,
    Image,
    Button,
    Dimensions,
    Platform,

} from 'react-native';
import theme from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
const createFormData = (photo) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  

  return data;
};

export default class Report extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:null,
            description:null,
            image:null
    }
  }

  saveData = () => {
    if(this.state.title==null){
      alert("Title cannot be empty.")
      return
    }
    else if (this.state.description==null){
      alert("Description cannot be empty.")
      return
    }
    this.setState({ loading: true, disabled: true }, () => {
      fetch('http://35.234.156.204/reports', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title:this.state.title,
            description:this.state.description,
            image:createFormData(this.state.image)
        })
      }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
            if(responseJson.statusCode!=200){
                alert(responseJson.message);
            }
            else {
              alert("Report Sent Successfully.");
              this.props.navigation.navigate('Balance');
            }
            this.setState({ loading: false, disabled: false });
        }).catch((error) => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
    });
  }
    componentDidMount() {
      this.getPermissionAsync();
      console.log('hi');
    }
    getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      
    };

    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };
    _launchCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };
    render(){
      let { image } = this.state;
        return(
            <View 
                style={{flex:1, backgroundColor:theme.COLORS.SEASHELL}}>
                <TouchableOpacity 
                    style={{alignItems:'center', justifyContent:'center', margin:10, width:50, height:50,
                    borderRadius:25, marginTop:30, backgroundColor:theme.COLORS.JAPANESE_INDIGO}} 
                    onPress= {() => this.props.navigation.toggleDrawer()}>
                    <Ionicons name="md-menu" color={theme.COLORS.SEASHELL} size={35}/>
                </TouchableOpacity>
                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={0}>
                <ScrollView>
                <View style={{flex:1, justifyContent:'center', margin:20}}>
                    <Text 
                        style={{marginLeft:5, marginBottom:5, color:theme.COLORS.JAPANESE_INDIGO}}>Title :</Text>
                    <TextInput 
                        style={{
                            borderWidth:1, 
                            borderRadius:3, 
                            borderColor:theme.COLORS.JAPANESE_INDIGO, 
                            backgroundColor:"white", 
                            marginBottom:5, 
                            paddingLeft:5}}
                            onChangeText = {(text) => this.setState({ title: text })}
                            />
                    <Text 
                        style={{marginLeft:5, marginBottom:5, color:theme.COLORS.JAPANESE_INDIGO}}>Description :</Text>
                    <TextInput 
                        style={{
                            borderWidth:1, 
                            borderRadius:3, 
                            borderColor:theme.COLORS.JAPANESE_INDIGO, 
                            backgroundColor:"white", 
                            marginBottom:5, 
                            paddingTop:5,
                            paddingLeft:5}} 
                            numberOfLines={8} 
                            textAlignVertical={"top"}
                            onChangeText = {(text) => this.setState({ description: text })}
                        />
                    <View 
                        style={{flexDirection:'row', alignItems:'center', marginLeft:5, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={this._pickImage} style={styles.btnSection}  >
                            <Text style={styles.btnText}>Choose File</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._launchCamera} style={styles.btnSection}  >
                            <Text style={styles.btnText}>Launch Camera</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', marginLeft:5, justifyContent: 'center' }}>
                      {image &&
                          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>
                    <TouchableOpacity onPress={this.saveData}
                        style={{marginVertical:40, marginHorizontal:60, backgroundColor:theme.COLORS.JAPANESE_INDIGO,
                            flexDirection:"row", alignItems:'center', justifyContent:'center', height:40}}>
                        <Text style={{fontWeight:'bold', fontSize:16, color:"white"}}>SEND</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    scrollView: {
      
    },
  
    body: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
      height: Dimensions.get('screen').height - 20,
      width: Dimensions.get('screen').width
    },
    btnSection: {
      width: 100,
      height: 50,
      backgroundColor: '#DCDCDC',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      marginBottom:10,
      marginTop:10,
      marginLeft:10
    },
    btnText: {
      textAlign: 'center',
      color: 'gray',
      fontSize: 14,
      fontWeight:'bold'
    }
  });