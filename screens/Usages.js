import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import theme from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';
import UsageCard from '../components/UsageCard';

export default class Usages extends React.Component {

    constructor (props) {
        super(props);
        this.state={
            userId: "",
            usages: [],
        }
    };

    getUsages = async () => {
        this.setState({ loading: true, disabled: true ,responseJS: ""}, () => {
          fetch('http://35.234.156.204/usages/closedSessions/' + this.state.userId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
          }).then((response) => response.json()).then( async (responseJson) => {
                this.setState({ loading: false, disabled: false });
                    const usages = responseJson.data.map((result) => ({
                        key : result.currentUsage.id,
                        createdAt: result.currentUsage.createdAt,
                        duration: (new Date(result.currentUsage.updatedAt) - new Date(result.currentUsage.createdAt))/60000,
                        total: result.currentUsage.totalFee,
                        startDockerName: result.startDocker.address,
                        endDockerName: result.endDocker.address
                    }))
                    
                    this.setState({usages});
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
    }

    _retrieveData = async (dataContainer) => { // takes string input
        try {
          const value = await AsyncStorage.getItem(dataContainer);
          if (value != null){
            return value;
          }
        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
    };

    async componentDidMount () {
        user = await this._retrieveData('user');
        userjsoned = JSON.parse(user);
        this.setState({userId : userjsoned.user._id});
        this.getUsages();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{alignItems:'center', justifyContent:'center', margin:10, width:50, height:50,
                    borderRadius:25, marginTop:30, backgroundColor:theme.COLORS.JAPANESE_INDIGO}} 
                    onPress= {() => this.props.navigation.toggleDrawer()}>
                    <Ionicons name="md-menu" color={theme.COLORS.SEASHELL} size={35}/>
                </TouchableOpacity>
                <UsageCard usages={this.state.usages}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: theme.COLORS.SEASHELL,
    }
});