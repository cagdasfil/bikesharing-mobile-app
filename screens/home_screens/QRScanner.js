import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import theme from '../../constants/Theme';


export default class QRScanner extends React.Component {

  static navigationOptions = {
    drawerLabel: () => null,
    drawerLockMode: 'locked-closed',
  };

  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  constructor(){
    super();
    this.state = {  qrCode: "",
                    userId: "",
                    dockerId:"",
                    loading: false,
                    disabled: false 
                  }
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
            qrCode : this.state.qrCode,
            userId : "5de40e78d8b373149471f969",//this.state.userId,
            dockerId : "5deb049a00e8d72bd4fe78cf" //this.state.lastDockerId
        })
      }).then((response) => response.json()).then((responseJson) => {
            this.setState({ loading: false, disabled: false });
            if(responseJson.errorCode===-101){
              alert("Invalid QR Code!");
            }
            else if(responseJson.errorCode===-102){
              alert("The bike is already in use!");
            }
            else if(responseJson.errorCode===-103){
              alert("You already have a bike!");
            }
            else if(responseJson.errorCode===-104){
              alert("There is no such a user!");
            }
            else if(responseJson.errorCode===-105){
              alert(responseJson.message);
            }
            else if(responseJson.errorCode===-106){
              alert("User balance under 10 tl!");
            }
            else if(responseJson.errorCode===-100){
              alert(responseJson.message);
            }
            else{
              console.log(responseJson.status);
              this.props.navigation.navigate('Session');
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

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true, qrCode: data });
    this.saveData();
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}