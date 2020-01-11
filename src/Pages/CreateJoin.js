import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Alert,
  Text,
  Image
} from "react-native";
import {
  Form,
  Icon,
  Item,
  Label,
  Input,
  Button,
  Container,
  Left,
  Right,
  Header,
  Content,
  Card,
  CardItem,
  Body
} from "native-base";

var myBackground = require("../assets/icons/profile_img1.jpg");
var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

class CreateJoin extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.getPlayerName();
  }

  getPlayerName = async () => {
    try {
      const playerName = await AsyncStorage.getItem("userlogin");
      if (playerName !== null) {
        // We have data!!
        // console.log(value);
        console.log(playerName);
      } else {
        console.log("NUll");
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  _signOutAsync = async () => {
    // alert(this.state.username)
    await AsyncStorage.clear();
    this.props.navigation.navigate("SignIn");
  };
  _twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      "Alert !!!",
      //body
      "You really want to LOGOUT ...?",
      [
        { text: "Yes", onPress: this._signOutAsync },
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

  // toggleDrawer = () => {
  //   //Props to open/close the drawer
  //   this.props.navigation.toggleDrawer();

  // };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={myBackground} style={styles.backgroundImage}>
          <Container style={{ paddingTop: 23, backgroundColor: "#154360" }}>
            <Header style={{ backgroundColor: "#3C7DFE" }}>
              <Left></Left>
              <Body>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 20,
                    paddingLeft: "10%",
                    paddingRight: "10%"
                  }}
                >
                  Create OR Join Team
                </Text>
              </Body>
              <Right>
                <Button transparent onPress={this._twoOptionAlertHandler}>
                  <Icon name="log-out" />
                </Button>
              </Right>
            </Header>
            <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <Button
                  //primary
                  style={{
                    backgroundColor: "#3C7DFE",
                    justifyContent: "center"
                  }}
                  onPress={() => this.props.navigation.navigate("CreateTeam")}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Create Team
                  </Text>
                </Button>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  //danger
                  style={{
                    backgroundColor: "#FF0000",
                    justifyContent: "center"
                  }}
                  onPress={() => this.props.navigation.navigate("JoinTeam")}
                >
                  <Text
                    style={{
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    Join Team
                  </Text>
                </Button>
              </View>
            </View>
          </Container>
        </ImageBackground>
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "15%"
  },
  inputStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 10
  },
  buttonContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: "flex-end"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: width,
    height: height
  },
  error: {
    borderColor: "red",
    borderWidth: 1
  }
};

export default CreateJoin;
