import React, { Component } from "react";
import {
  View,
  Alert,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Item,
  Input,
  Card,
  Content,
  CardItem
} from "native-base";
import axios from "axios";
import { AsyncStorage, ScrollView } from "react-native";

var myBackground = require("../../assets/icons/backgrnd.jpg");
var myimage = require("../../assets/icons/profile_img1.jpg");
var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

class Dashboard extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      userLogin: [],
      teamId: []
    };
    this.getEmail();
  }

  getEmail = () => {
    AsyncStorage.getItem("userlogin").then(string => {
      //console.log(string);
      this.setState({ userLogin: JSON.parse(string) });
      // console.log(this.state.userLogin.id);
      var id = this.state.userLogin.id;
      this.setState({ id: id });
      // console.log(this.state.id);
      this.teamsData();
    });
  };

  teamsData = () => {
    //send response
    var self = this;
    //console.log(self.state.id);
    axios
      .post(global.url + "/api/getPlayerid", {
        player_id: self.state.id
      })
      .then(function(response) {
        //console.log(response.data.id);
        self.setState({ teamId: response.data.id });
        //console.log(self.state.teamId);
        self.saveTeamId();
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  saveTeamId = async () => {
    //await AsyncStorage.setItem("teamid", this.state.teamId);
    AsyncStorage.setItem("teamid", JSON.stringify(this.state.teamId));
    console.log("success");
  };
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigation.toggleDrawer();
  };
  screenProfil = () => {
    this.props.navigation.navigate("Profile");
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

  _signOutAsync = async () => {
    // alert(this.state.username)
    await AsyncStorage.clear();
    this.props.navigation.navigate("SignIn");
  };

  render() {
    return (
      <Container style={styles.container}>
        <ImageBackground source={myBackground} style={styles.backgroundImage}>
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
                  fontSize: 25,
                  paddingLeft: "10%"
                }}
              >
                Cricket Zone
              </Text>
            </Body>
            <Right>
              <Button transparent onPress={this._twoOptionAlertHandler}>
                <Icon name="log-out" />
              </Button>
            </Right>
          </Header>
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Content>
                <TouchableOpacity
                  style={styles.touchablestyle}
                  onPress={() => this.props.navigation.navigate("TeamPlayers")}
                >
                  <Card>
                    <CardItem style={styles.cardcolor}>
                      <Body style={styles.bodystyle}>
                        <Image
                          source={myimage}
                          style={{ height: 70, width: 70, borderRadius: 5 }}
                        />
                        <Text style={styles.textstyle}>Team Playerz</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </Content>
              <Text></Text>
              <Content>
                <TouchableOpacity
                  style={styles.touchablestyle}
                  onPress={() =>
                    this.props.navigation.navigate("SelectedEleven")
                  }
                >
                  <Card>
                    <CardItem style={styles.cardcolor}>
                      <Body style={styles.bodystyle}>
                        <Image
                          source={myimage}
                          style={{ height: 70, width: 70, borderRadius: 5 }}
                        />
                        <Text style={styles.textstyle}> Selected 11</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </Content>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Content>
                <TouchableOpacity
                  style={styles.touchablestyle}
                  onPress={() =>
                    this.props.navigation.navigate("UpcommingTrmnt")
                  }
                >
                  <Card>
                    <CardItem style={styles.cardcolor}>
                      <Body style={styles.bodystyle}>
                        <Image
                          source={myimage}
                          style={{ height: 70, width: 70, borderRadius: 5 }}
                        />
                        <Text style={styles.textstyle}>Comming Tournament</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </Content>
              <Content>
                <TouchableOpacity
                  style={styles.touchablestyle}
                  onPress={() => this.props.navigation.navigate("JoinedTrmnt")}
                >
                  <Card>
                    <CardItem style={styles.cardcolor}>
                      <Body style={styles.bodystyle}>
                        <Image
                          source={myimage}
                          style={{ height: 70, width: 70, borderRadius: 5 }}
                        />
                        <Text style={styles.textstyle}>Join Tournament</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </Content>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Content>
                <TouchableOpacity style={styles.touchablestyle}>
                  <Card>
                    <CardItem style={styles.cardcolor}>
                      <Body style={styles.bodystyle}>
                        <Image
                          source={myimage}
                          style={{ height: 70, width: 70, borderRadius: 5 }}
                        />
                        <Text style={styles.textstyle}>Match Details</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </Content>
              <Content>
                <TouchableOpacity
                  style={styles.touchablestyle}
                  onPress={() => this.props.navigation.navigate("AddPlayer")}
                >
                  <Card>
                    <CardItem style={styles.cardcolor}>
                      <Body style={styles.bodystyle}>
                        <Image
                          source={myimage}
                          style={{ height: 70, width: 70, borderRadius: 5 }}
                        />
                        <Text style={styles.textstyle}>Add Players</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </Content>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1

    // alignItems: 'center',
    // justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: width,
    height: height
  },
  touchablestyle: {
    flex: 1,
    marginRight: 20
  },
  cardcolor: {
    backgroundColor: "#C70039",
    borderRadius: 5
  },
  bodystyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C70039",
    borderRadius: 5
  },
  textstyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  }
});
