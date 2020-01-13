import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Icon } from "native-base";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { white } from "ansi-colors";

var myimage = require("../assets/splash_img1.jpg");
var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

export default class drawerContentComponents extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ flex: 1, padding: 5 }}>
            <Image source={myimage} style={{ height: 70, width: 70 }} />
          </View>
        </View>
        <View style={styles.screenContainer}>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "MainPage"
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Icon name="md-home" style={{ color: "#fff" }} />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "MainPage"
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen("MainPage")}
            >
              Home
            </Text>
          </View>
          <Text></Text>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "match_list"
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Icon name="md-home" style={{ color: "#fff" }} />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "match_list"
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen("match_list")}
            >
              Cricker Score
            </Text>
          </View>
          <Text></Text>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "Profile"
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Icon name="md-contact" style={{ color: "#fff" }} />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "Profile"
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen("PlayerInfo")}
            >
              Profile
            </Text>
          </View>
          <Text></Text>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "Setting"
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Icon name="md-settings" style={{ color: "#fff" }} />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "Setting"
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen("ChangeRole")}
            >
              Setting
            </Text>
          </View>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "StartMatch"
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Icon name="md-settings" style={{ color: "#fff" }} />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "StartMatch"
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen("StartMatch")}
            >
              StartMatch
            </Text>
          </View>
          <Text></Text>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "Help"
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Icon name="md-help-circle" style={{ color: "#fff" }} />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "Help"
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen("Help")}
            >
              Help
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2A3F54",
    padding: 5
  },
  headerContainer: {
    flexDirection: "row",
    paddingTop: 70,
    backgroundColor: "#2A3F54"
  },
  headerText: {
    color: "#fff8f8"
  },
  screenContainer: {
    paddingTop: 50,
    width: "100%"
  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20,
    textAlign: "center",
    color: "#fff"
  },
  selectedTextStyle: {
    fontWeight: "bold",
    color: "#00adff"
  },
  activeBackgroundColor: {
    backgroundColor: "grey"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: width,
    height: height
  }
});
