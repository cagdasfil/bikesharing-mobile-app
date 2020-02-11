import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import theme from '../../constants/Theme';
import {AsyncStorage} from 'react-native';
import Dialog from 'react-native-dialog';

export default class QRScanner extends React.Component {

  constructor(){
    super();
    this.state = {  qrCode: "",
                    userId: "",
                    dockerId:"",
                    bikeId : "",
                    session:null,
                    user: null,
                    loading: false,
                    disabled: false,
                    hasCameraPermission: null,
                    scanned: false,
                    visible:false,
                  }
  }

  _storeData = async (dataContainer, data) => { //both parameters are string.
    try {
      await AsyncStorage.setItem(dataContainer, data);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  _retrieveData = async (data) => { // takes string input
    try {
      const value = await AsyncStorage.getItem(data);
      return value;
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  checkBikeAvailability = () => {
    this.setState({ loading: true, disabled: true }, () => {
      fetch('http://35.234.156.204/bikes/checkAvailability/'+this.state.qrCode, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      }).then((response) => response.json()).then((responseJson) => {
        this.setState({ loading: false, disabled: false });
        if(responseJson.status===200){
          this.setState({bikeId:responseJson.data._id,visible:true});
        }
        else{
          alert(responseJson.message);
        }
        }).catch((error) => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
    });
  }
  saveData = () => {
    this.setState({ loading: true, disabled: true }, () => {
      fetch('http://35.234.156.204/usages/startSession', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bikeId : this.state.bikeId,
            userId : this.state.user.user._id,
            dockerId : "5deb049a00e8d72bd4fe78cf"//A1 DockerID
        })
      }).then((response) => response.json()).then((responseJson) => {

        this.setState({ loading: false, disabled: false });
        
        if(responseJson.status===200){

          this.setState({session:responseJson.data});
          this._storeData("session", JSON.stringify(responseJson.data));
          this.props.navigation.navigate('Session');

        }
        else{
          alert(responseJson.message);
        }
        }).catch((error) => {
            console.error(error);
            this.setState({ loading: false, disabled: false });
          });
    });
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };


  async componentWillMount () {
    //this.saveData();
    var currentUser = await this._retrieveData('user');
    if(user != null){
        currentUser = JSON.parse(currentUser);
        this.setState({user:currentUser});
    }
    else{
        alert("User authentication failed.");
    }
}


  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundColor: theme.COLORS.SEASHELL
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View>
            <Dialog.Container
              onBackdropPress={() => {this.setState({ visible: false })}} 
              visible={this.state.visible}>
              <Dialog.Title>Do you want to start session?</Dialog.Title>  
              <Dialog.Button label="OK" onPress={() => {this.saveData();this.setState({ visible: false });}} />
              <Dialog.Button label="Cancel" onPress={() => this.setState({ visible: false })} />
            </Dialog.Container>
          </View>
        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true, qrCode: data });
    this.checkBikeAvailability();
    
  };
}