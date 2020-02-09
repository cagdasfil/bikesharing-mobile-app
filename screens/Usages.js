import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import React from 'react';
import theme from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import ResetPassword from './ResetPassword';
import { SafeAreaView } from 'react-navigation';

export default class Usages extends React.Component {

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
                    <View style={{marginHorizontal:10, marginVertical:5, backgroundColor:theme.COLORS.PEACH, borderWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{marginLeft:5}}>
                            <Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>09/02/2020 15:35</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', marginVertical:10}}>
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Duration:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>44dk</Text>
                            </View>
                            <View style={{alignItems:'center', flexDirection:'row', marginLeft:25}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Total:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>10.75₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A1 GATE</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-arrow-forward" color={theme.COLORS.JAPANESE_INDIGO}/>
                            </View>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A4 GATE</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginVertical:5, backgroundColor:theme.COLORS.PEACH, borderWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{marginLeft:5}}>
                            <Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>08/02/2020 12:45</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', marginVertical:10}}>
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Duration:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>34dk</Text>
                            </View>
                            <View style={{alignItems:'center', flexDirection:'row', marginLeft:25}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Total:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>8.45₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU MM</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-arrow-forward" color={theme.COLORS.JAPANESE_INDIGO}/>
                            </View>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A1 GATE</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginVertical:5, backgroundColor:theme.COLORS.PEACH, borderWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{marginLeft:5}}>
                            <Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>06/02/2020 18:14</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', marginVertical:10}}>
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Duration:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>23dk</Text>
                            </View>
                            <View style={{alignItems:'center', flexDirection:'row', marginLeft:25}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Total:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>5.90₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A4 GATE</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-arrow-forward" color={theme.COLORS.JAPANESE_INDIGO}/>
                            </View>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A1 GATE</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginVertical:5, backgroundColor:theme.COLORS.PEACH, borderWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{marginLeft:5}}>
                            <Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>02/02/2020 09:56</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', marginVertical:10}}>
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Duration:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>32dk</Text>
                            </View>
                            <View style={{alignItems:'center', flexDirection:'row', marginLeft:25}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Total:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>8.15₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A1 GATE</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-arrow-forward" color={theme.COLORS.JAPANESE_INDIGO}/>
                            </View>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU MM</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginVertical:5, backgroundColor:theme.COLORS.PEACH, borderWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{marginLeft:5}}>
                            <Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>29/01/2020 16:35</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', marginVertical:10}}>
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Duration:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>41dk</Text>
                            </View>
                            <View style={{alignItems:'center', flexDirection:'row', marginLeft:25}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Total:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>10.25₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A1 GATE</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-arrow-forward" color={theme.COLORS.JAPANESE_INDIGO}/>
                            </View>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A4 GATE</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginVertical:5, backgroundColor:theme.COLORS.PEACH, borderWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{marginLeft:5}}>
                            <Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>28/01/2020 13:27</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', marginVertical:10}}>
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Duration:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>44dk</Text>
                            </View>
                            <View style={{alignItems:'center', flexDirection:'row', marginLeft:25}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Total:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>10.75₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A1 GATE</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-arrow-forward" color={theme.COLORS.JAPANESE_INDIGO}/>
                            </View>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A4 GATE</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginVertical:5, backgroundColor:theme.COLORS.PEACH, borderWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{marginLeft:5}}>
                            <Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>09/02/2020 15:35</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', marginVertical:10}}>
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Duration:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>44dk</Text>
                            </View>
                            <View style={{alignItems:'center', flexDirection:'row', marginLeft:25}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Total:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>10.75₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A1 GATE</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-arrow-forward" color={theme.COLORS.JAPANESE_INDIGO}/>
                            </View>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A4 GATE</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, marginVertical:5, backgroundColor:theme.COLORS.PEACH, borderWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                        <View style={{marginLeft:5}}>
                            <Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>09/02/2020 15:35</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', marginVertical:10}}>
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Duration:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>44dk</Text>
                            </View>
                            <View style={{alignItems:'center', flexDirection:'row', marginLeft:25}}>
                                <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontWeight:'bold'}}>Total:</Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>10.75₺</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A1 GATE</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-remove" color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Ionicons name="md-arrow-forward" color={theme.COLORS.JAPANESE_INDIGO}/>
                            </View>
                            <View style={{marginHorizontal:5, alignItems:'center'}}>
                                <Ionicons name="md-pin" size={20} color={theme.COLORS.JAPANESE_INDIGO}/>
                                <Text style={{fontSize:10, color:theme.COLORS.JAPANESE_INDIGO}}>METU A4 GATE</Text>
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