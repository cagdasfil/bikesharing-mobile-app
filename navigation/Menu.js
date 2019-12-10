import React from "react";
import { DrawerItems } from "react-navigation-drawer";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  View
} from "react-native";
import { theme } from "galio-framework";

const { width } = Dimensions.get("screen");

const Drawer = props => (
  <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
    <View flex={0.05} style={styles.header}>
      <Image style={styles.logo} source={require("../assets/images/default_profile_picture.jpg")} />
    </View>
    <View flex={1}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerItems {...props} />
      </ScrollView>
    </View>
  </View>
);

const Menu = {
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: "white",
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: "darkblue",
    inactiveTintColor: "gray",
    activeBackgroundColor: "transparent",
    itemStyle: {
      width: width * 0.75,
      backgroundColor: "transparent"
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: "normal"
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    //paddingHorizontal: 28,
    //paddingBottom: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE * 7,
    marginBottom: theme.SIZES.BASE * 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
      width:150,
      height:150,
      borderRadius:75,
  }
});

export default Menu;
