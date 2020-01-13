import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
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
import { Avatar } from "react-native-elements";
import axios from "axios";

class PlayerInfo extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      player_name: "",
      player_num: "",
      numof_six: "",
      numof_four: "",
      numof_dots: "",
      user: []
    };
    this.getData();
  }

  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigation.toggleDrawer();
  };

  getData = () => {
    try {
      AsyncStorage.getItem("userlogin").then(string => {
        console.log(string);
        this.setState({ user: JSON.parse(string) });
      });
    } catch (e) {
      // error reading value
    }
  };

  updateProfile = () => {
    var self = this;
    axios
      .post(global.url + "/api/profileStore", {
        user_id: self.state.user.id,
        player_name: self.state.player_name,
        player_num: self.state.player_num,
        num_six: self.state.numof_six,
        num_four: self.state.numof_four,
        num_dots: self.state.numof_dots
      })
      .then(function(response) {
        console.log(response);
        self.props.navigation.navigate("MainPage");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.wholecontainer}>
        <Container style={{ backgroundColor: "#CBD8E9" }}>
          <Header style={{ backgroundColor: "#154360" }}>
            <Left>
              <Button transparent onPress={this.toggleDrawer.bind(this)}>
                <Icon name="menu" />
              </Button>
            </Left>
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
                User Profile{" "}
              </Text>
            </Body>
          </Header>
          <Content style={{ padding: 10, flex: 1 }}>
            <Card>
              <Card>
                <CardItem style={{ backgroundColor: "#154360" }}>
                  <Body>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        fontWeight: "bold"
                      }}
                    >
                      {this.state.user.first_name}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        fontWeight: "bold"
                      }}
                    >
                      {this.state.user.email}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        fontWeight: "bold"
                      }}
                    >
                      {this.state.user.contact}
                    </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ borderRadius: 20 }}>
                <CardItem style={{ backgroundColor: "" }}>
                  <Body>
                    <Label style={{ color: "black", fontWeight: "bold" }}>
                      Total Score :
                    </Label>
                    <Text></Text>
                    <Label style={{ color: "black", fontWeight: "bold" }}>
                      Total Matches :
                    </Label>
                    <Text></Text>
                    <Label style={{ color: "black", fontWeight: "bold" }}>
                      Total 100's :
                    </Label>
                    <Text></Text>
                    <Label style={{ color: "black", fontWeight: "bold" }}>
                      Total 50's :
                    </Label>
                    <Text></Text>
                    <Label style={{ color: "black", fontWeight: "bold" }}>
                      Average :
                    </Label>
                    <Text></Text>
                    <Label style={{ color: "black", fontWeight: "bold" }}>
                      Strike Rate :
                    </Label>
                    <Text></Text>
                  </Body>
                </CardItem>
              </Card>
            </Card>
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: "5%"
  },
  wholecontainer: {
    flex: 1,
    backgroundColor: "#154360"
  },
  viewContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    height: 160,
    borderColor: "rgb(169, 50, 38)",
    backgroundColor: "#fff"
  }
});

export default PlayerInfo;
