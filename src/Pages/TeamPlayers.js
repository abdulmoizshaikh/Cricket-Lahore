import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ImageBackground,
  ToastAndroid,
  TouchableOpacity
} from "react-native";
import {
  Item,
  Label,
  Input,
  Button,
  Container,
  Left,
  Header,
  Body,
  Content,
  Icon,
  Card,
  CardItem
} from "native-base";
import {
  AsyncStorage,
  ScrollView,
  Animated,
  Dimensions,
  Keyboard,
  UIManager
} from "react-native";
import axios from "axios";

var myBackground = require("../assets/icons/backgrnd.jpg");
var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

class TeamPlayers extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      totalPlayers: [],
      userLogin: [],
      teamId: [],
      name: "",
      id: "",
      type: "",
      delID: ""
    };
    this.getEmail();
  }
  getEmail = () => {
    AsyncStorage.getItem("userlogin").then(string => {
      //console.log(string);
      this.setState({ userLogin: JSON.parse(string) });
      var id = this.state.userLogin.id;
      //console.log(this.state.userLogin)
      this.setState({ id: id });
      this.teamsData();
    });
  };
  componentWillMount() {
    this._subscribe = this.props.navigation.addListener("didFocus", () => {
      this.teamsData();
      //Put your Data loading function here instead of my this.LoadData()
    });
  }

  teamsData = () => {
    //send response
    var self = this;
    //console.log(self.state.id);
    axios
      .post(global.url + "/api/getPlayerid", {
        player_id: self.state.id
      })
      .then(function(response) {
        //console.log(response.data);
        self.setState({ teamId: response.data.id });
        // console.log(self.state.teamId);
        self.getteamPlayer();
      })
      .catch(function(error) {
        // console.log(error);
      });
  };
  getteamPlayer = () => {
    var team_id = this.state.teamId;
    var self = this;
    axios
      .post(global.url + "/api/showPlayer", {
        team_id: team_id
      })
      .then(function(response) {
        //console.log("hi")
        console.log(response.data);
        self.setState({ totalPlayers: response.data.data });
        console.log(self.state.totalPlayers);
      });
  };

  selectplayer = playerid => {
    alert(playerid);
    var self = this;
    axios
      .post(global.url + "/api/updateStatus", {
        player_id: playerid,
        status: "selected"
      })
      .then(function(response) {
        console.log("select");
        console.log(response.data.message);
        if (response.data.message == "Player is already selected") {
          ToastAndroid.show("Player is already selected", ToastAndroid.LONG);
        } else {
          ToastAndroid.show("player select successfully", ToastAndroid.LONG);
        }
      });
  };

  dropplayer = () => {
    //alert(playerid);
    console.log(this.state.delID);
    var self = this;
    axios
      .post(global.url + "/api/dropplayer", {
        player_id: self.state.delID,
        team_id: self.state.teamId
      })
      .then(function(response) {
        console.log(response.data.success);

        if (response.data.success) {
          self.teamsData();
          ToastAndroid.show("player Droped Successfully", ToastAndroid.LONG);
          console.log(response.data.message);
        } else {
          console.log("hehe");
        }
        //   if(response.data.message == "Player is not selected yet")
        //   {
        //       alert("droped");
        //   }
        //   else{
        //     alert("player is droped successfully");
        //   }
        // self.setState({totalPlayers:response.data.data});
        //console.log(self.state.totalPlayers);
      });
  };
  _twoOptionAlertHandler = () => {
    Alert.alert(
      //title
      "Alert !!!",
      //body
      "You really want to Drop the player...?",
      [
        { text: "Yes", onPress: this.dropplayer },
        {
          text: "No",
          onPress: () => console.log(this.state.delID),
          style: "cancel"
        }
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

  Capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container style={{ backgroundColor: "#CBD8E9" }}>
          <ImageBackground source={myBackground} style={styles.backgroundImage}>
            <Header style={{ backgroundColor: "#154360" }}>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.navigate("MainPage")}
                >
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}
                >
                  Team Players
                </Text>
              </Body>
            </Header>

            <Content style={{ padding: 10 }}>
              {this.state.totalPlayers.map(totalPlayers => (
                <Card key={totalPlayers.id}>
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
                          {this.Capitalize(totalPlayers.first_name)}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                  <CardItem style={{ backgroundColor: "#fff" }}>
                    <Body>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 15,
                          fontWeight: "bold"
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontSize: 15,
                            fontWeight: "bold"
                          }}
                        >
                          Email :{" "}
                        </Text>{" "}
                        {totalPlayers.email}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 15,
                          fontWeight: "bold"
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontSize: 15,
                            fontWeight: "bold"
                          }}
                        >
                          Contact :{" "}
                        </Text>{" "}
                        {totalPlayers.contact}
                      </Text>
                      {/* <Text style={{color:"black"}}>{totalPlayers.id}</Text> */}
                      <Text> </Text>
                      <View
                        key={totalPlayers.id}
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: "#3C7DFE",
                            width: 80,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                          onPress={() => this.selectplayer(totalPlayers.id)}
                        >
                          <Text style={{ color: "#fff" }}>Select</Text>
                        </Button>
                        <Text> </Text>
                        <Button
                          style={{
                            backgroundColor: "#FF0000",
                            width: 80,
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                          onPress={() =>
                            this.setState(
                              { delID: totalPlayers.id.toString() },
                              this._twoOptionAlertHandler()
                            )
                          }
                        >
                          <Text style={{ color: "#fff" }}>Drop</Text>
                        </Button>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              ))}
            </Content>
          </ImageBackground>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  textinput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    color: "#050505",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#050505",
    paddingTop: 25,
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "#050505",
    borderBottomWidth: 1
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0A18F5",
    marginTop: 30
  },
  btntext: {
    color: "#050505",
    fontWeight: "bold"
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
});
export default TeamPlayers;
