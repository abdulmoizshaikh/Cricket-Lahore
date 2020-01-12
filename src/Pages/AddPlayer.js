import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions
} from "react-native";
import {
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
import { AsyncStorage } from "react-native";
import axios from "axios";

var myBackground = require("../assets/icons/backgrnd.jpg");
var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

class AddPlayer extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      team_id: [],
      usernameFlag: false
    };
    this.getteamtID();
  }

  getteamtID = async () => {
    AsyncStorage.getItem("teamid").then(string => {
      //console.log(string);
      this.setState({ team_id: JSON.parse(string) });
      // console.log(this.state.team_id);
    });
  };

  validate = () => {
    if (this.state.username === "") {
      this.setState({ usernameFlag: true });
    } else {
      this.addplayer();
    }
  };

  addplayer = () => {
    alph = /^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/;
    num = /^03[0-9]{2}[0-9]{7}$/;

    var self = this;
    console.log(self.state.username);
    console.log(self.state.team_id);

    if (alph.test(self.state.username)) {
      axios
        .post(global.url + "/api/addPlayer", {
          email: self.state.username,
          team_id: self.state.team_id,
          type: "email"
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.playeradd) {
            console.log("true");
            self.props.navigation.navigate("MainPage");
          } else {
            console.log("false");
          }
        })
        .catch(function(error) {
          // console.log("error");
        });
    } else if (num.test(self.state.username)) {
      axios
        .post(global.url + "/api/addPlayer", {
          email: self.state.username,
          team_id: self.state.team_id,
          type: "contact"
        })
        .then(function(response) {
          if (response.data.success) {
            console.log(response.data);
          }
        });
    }
  };

  render() {
    return (
      <Container style={styles.container}>
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
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 25 }}>
                Add Player
              </Text>
            </Body>
          </Header>

          <Content>
            <View style={{ padding: 10 }}>
              <Card>
                <CardItem>
                  <Body>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      Email / Contact # :
                    </Text>
                    <Input
                      style={{ backgroundColor: "#EDEDED" }}
                      underlineColorAndroid="#000"
                      style={{ fontWeight: "bold", borderColor: "black" }}
                      autoCorrect={false}
                      onChangeText={text => this.setState({ username: text })}
                      blurOnSubmit={false}
                    />
                    {this.state.usernameFlag ? (
                      <Text style={{ color: "red", fontWeight: "bold" }}>
                        field is empty
                      </Text>
                    ) : (
                      <View></View>
                    )}
                    <Text></Text>
                    <Button
                      //primary
                      style={{ backgroundColor: "#3C7DFE" }}
                      block
                      onPress={this.validate}
                    >
                      <Text style={{ color: "white" }}>Add</Text>
                    </Button>
                  </Body>
                </CardItem>
              </Card>
            </View>
          </Content>
        </ImageBackground>
      </Container>
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
export default AddPlayer;
