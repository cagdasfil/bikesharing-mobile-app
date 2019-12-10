import React from "react";
import { StyleSheet } from "react-native";
import { View, Text} from "react-native";

import theme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Ionicon
            name="shop"
            family="ArgonExtra"
            size={10}
            color={focused ? "white" : theme.COLORS.JAPANESE_INDIGO}
          />
        );
      case "Elements":
        return (
          <Ionicon
            name="map-big"
            family="ArgonExtra"
            size={12}
            color={focused ? "white" : theme.COLORS.JAPANESE_INDIGO}
          />
        );
      case "Articles":
        return (
          <Ionicon
            name="spaceship"
            family="ArgonExtra"
            size={12}
            color={focused ? "white" : theme.COLORS.JAPANESE_INDIGO}
          />
        );
      case "Profile":
        return (
          <Ionicon
            name="chart-pie-35"
            family="ArgonExtra"
            size={12}
            color={focused ? "white" : theme.COLORS.JAPANESE_INDIGO}
          />
        );
      case "Account":
        return (
          <Ionicon
            name="calendar-date"
            family="ArgonExtra"
            size={12}
            color={focused ? "white" : theme.COLORS.JAPANESE_INDIGO}
          />
        );
      case "Getting Started":
        return <Ionicon />;
      case "Log out":
        return <Ionicon />;
      default:
        return null;
    }
  };

  render() {
    const { focused, title } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <View flex={1} row style={containerStyles}>
        <View middle flex={0.1} style={{ marginRight: 5 }}>
          {this.renderIcon()}
        </View>
        <View row center flex={0.9}>
          <Text
            size={15}
            bold={focused ? true : false}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          >
            {title}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14
  },
  activeStyle: {
    backgroundColor: theme.COLORS.DIAMOND,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.SEASHELL,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
