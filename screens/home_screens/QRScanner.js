import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
    this.state = {  qrcode: "", 
                    loading: false,
                    disabled: false 
                  }
  }

  saveData = () => {
    this.setState({ loading: true, disabled: true }, () => {
      fetch('http://35.246.82.72/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            qrcode : this.state.qrcode,
        })
      }).then((response) => response.json()).then((responseJson) => {
            this.setState({ loading: false, disabled: false });
            if ( "error" in responseJson ){
              alert("QR code is not recognized!");
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
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}