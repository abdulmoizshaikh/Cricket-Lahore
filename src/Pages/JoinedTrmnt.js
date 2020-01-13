import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
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

class JoinedTrmnt extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      joinedTrmnt: [],
      userLogin: [],
      email: "",
      type: "",
      id: "",
      team_id: [],
      flag: false
    };
    this.getteamtID();
  }

  getteamtID = async () => {
    AsyncStorage.getItem("teamid").then(string => {
      //console.log(string);
      this.setState({ team_id: JSON.parse(string) });
      console.log(this.state.team_id);
      this.gettournament();
    });
  };
  gettournament = () => {
    var team_id = this.state.team_id;
    console.log(team_id);
    var self = this;
    axios
      .post(global.url + "/api/joinedtournaments", {
        team_id: team_id
      })
      .then(function(response) {
        // console.log("hi")
        //console.log(response.data);
        self.setState({ joinedTrmnt: response.data.data });
        self.setState({ flag: response.data.success });
        if (self.state.flag) {
          self.props.navigation.navigate("MainPage");
          ToastAndroid.show("NO Tournament Found", ToastAndroid.LONG);
        }
        //console.log(self.state.joinedTrmnt);
      });
  };
  back = () => {
    this.props.navigation.navigate("MainPage");
    ToastAndroid.show("NO Tournament Found", ToastAndroid.LONG);
  };

  tournamentID = async trmnt => {
    var trmnt_id = trmnt;
    console.log(trmnt_id);
    AsyncStorage.setItem("tournamentID", JSON.stringify(trmnt_id));
    console.log("tournamentID success");
    this.teamID();
  };
  teamID = async () => {
    var team_id = this.state.team_id;
    console.log(team_id);
    AsyncStorage.setItem("teamID", JSON.stringify(this.state.teamId));
    console.log("teamID success");
    this.props.navigation.navigate("MatchesSchedule");
  };

  droptrmnt = trmnt_id => {
    var team_id = this.state.team_id;
    console.log(this.state.team_id);
    var self = this;
    axios
      .post(global.url + "/api/droptournaments", {
        team_id: team_id,
        tournament_id: trmnt_id
      })
      .then(function(response) {
        console.log(response.data.message);
      })
      .catch(function(error) {});
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container style={{ backgroundColor: "#CBD8E9" }}>
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
                Joined Tournaments
              </Text>
            </Body>
          </Header>

          <Content>
            {this.state.flag ? (
              this.state.joinedTrmnt.map(joinedTrmnt => (
                <Card key={joinedTrmnt.id}>
                  <CardItem style={{ backgroundColor: "#fff" }}>
                    <Body>
                      <Text style={{ color: "black" }}>{joinedTrmnt.name}</Text>
                      <Text style={{ color: "black" }}>
                        {joinedTrmnt.startingDate}
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Button
                          style={{ backgroundColor: "#FF0000" }}
                          onPress={() => this.droptrmnt(joinedTrmnt.id)}
                        >
                          <Text
                            style={{
                              color: "white",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            Drop
                          </Text>
                        </Button>
                        <Button
                          style={{ backgroundColor: "#3C7DFE" }}
                          onPress={() => this.tournamentID(joinedTrmnt.id)}
                        >
                          <Text
                            style={{
                              color: "white",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            Matches
                          </Text>
                        </Button>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              ))
            ) : (
              <View>
                {this.back()}
                {/*              
               <Text style={{flex:1,color: 'white',fontWeight:'bold',justifyContent:'center',alignItems:'center'}}>No Tournaments Found</Text>
              */}
              </View>
            )}
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch"
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
    resizeMode: "cover"
    // width: width,
    // height: height
  },
  error: {
    borderColor: "red",
    borderWidth: 1
  }
});
export default JoinedTrmnt;
