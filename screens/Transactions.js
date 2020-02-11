import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import React from 'react';
import theme from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import ResetPassword from './ResetPassword';

export default class Transactions extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', margin:10, width:50, height:50,
                        borderRadius:25, backgroundColor:theme.COLORS.JAPANESE_INDIGO}} 
                        onPress= {() => this.props.navigation.toggleDrawer()}>
                        <Ionicons name="md-menu" color={theme.COLORS.SEASHELL} size={35}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>09/02/2020 15:35</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Load</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'green'}}>+8.50₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>-</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>21.65₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>07/02/2020 13:25</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Usage</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'crimson'}}>-12.75₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>1326518</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>13.15₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>03/02/2020 17:02</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Load</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'green'}}>+16.00₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>-</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>25.90₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>01/02/2020 16:56</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Stoppage</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'crimson'}}>-15.40₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>1255658</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>9.90₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>29/01/2020 15:30</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Load</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'green'}}>+10.00₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>-</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>25.30₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>28/01/2020 11:20</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Usage</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'crimson'}}>-10.75₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>1326518</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>15.30₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>25/01/2020 15:55</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Usage</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'crimson'}}>-8.60₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>3569656</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>26.05₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>20/01/2020 12:13</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Stoppage</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'crimson'}}>-7.15₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>1255658</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>34.65₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>19/01/2020 10:22</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Load</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'green'}}>+8.50₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>-</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>15.65₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>09/02/2020 15:35</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Usage</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'crimson'}}>-10.75₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>1326518</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>15.65₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>09/02/2020 15:35</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Load</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'green'}}>+16.00₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>-</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>15.65₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>09/02/2020 15:35</Text>
                                <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>Stoppage</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{fontSize:28, color:'crimson'}}>-15.40₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                            <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>1255658</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>15.65₺</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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