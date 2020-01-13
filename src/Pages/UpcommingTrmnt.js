import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  ImageBackground,
  KeyboardAvoidingView,
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

class UpcommingTrmnt extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      trmntTeams: [],
      userLogin: [],
      team_id: [],
      name: "",
      id: "",
      requiredTeam: "",
      type: "",
      isVisible: false
    };
    this.tournamentData();
  }
  getEmail = () => {
    AsyncStorage.getItem("userlogin").then(string => {
      //console.log(string);
      this.setState({ userLogin: JSON.parse(string) });
      var id = this.state.userLogin.id;
      this.setState({ id: id });
      this.teamsData();
    });
  };

  tournamentData = () => {
    //send response
    var self = this;
    axios.get(global.url + "/api/tournament").then(function(response) {
      //console.log(response.data);
      self.setState({ trmntTeams: response.data.data });
      console.log(self.state.trmntTeams);
      console.log("imhere");
      self.setState({ isVisible: response.data.success });
      if (self.state.isVisible) {
        self.gettrmntID();
      } else {
        self.props.navigation.navigate("MainPage");
        ToastAndroid.show("NO upcomming Tournaments Found", ToastAndroid.LONG);
      }
    });
  };
  back = () => {
    this.props.navigation.navigate("MainPage");
    ToastAndroid.show("Click Again to see tournaments", ToastAndroid.LONG);
  };
  gettrmntID = async () => {
    AsyncStorage.getItem("teamid").then(string => {
      //console.log(string);
      this.setState({ team_id: JSON.parse(string) });
      // console.log(this.state.team_id[0]);
      var id = this.state.team_id;
      console.log(id);
      // this.setState({id: id});
      // this.teamsData();
    });
  };

  teamsData = () => {
    // //send response
    // var self=this;
    // console.log("id is" + self.state.id);
    // axios.post("http://192.168.5.107:8000/api/getPlayerid",{
    //     player_id:self.state.id,
    // }).then(function(response){
    //     //console.log(response.data);
    //     self.setState({teamId:response.data.data})
    //     console.log(self.state.teamId);
    //     self.getteamPlayer();
    //     }).catch(function(error){
    //      console.log(error);
    //       })
  };
  getteamPlayer = () => {
    //     var team_id=this.state.teamId[0];
    //     var self=this;
    //  axios.post("http://192.168.5.107:8000/api/showPlayer",{
    //   team_id:team_id,
    //     }).then(function(response){
    //         console.log("hi")
    //      // console.log(response.data);
    //       self.setState({totalPlayers:response.data.data});
    //       console.log(self.state.totalPlayers);
    // })
  };

  selectplayer = (trmntid, requiredTeam) => {
    alert(this.state.team_id);
    var self = this;
    axios
      .post(global.url + "/api/jointournament", {
        team_id: self.state.team_id,
        requiredTeam: requiredTeam,
        tournament_id: trmntid
      })
      .then(function(response) {
        console.log("select");
        console.log(response.data.message);
        // self.setState({totalPlayers:response.data.data});
        //console.log(self.state.totalPlayers);
      })
      .catch(function(error) {
        console.log("error");
        // console.log(response.data.message);
      });
  };

  dropplayer = playerid => {
    //     //alert(playerid);
    //     var self=this;
    //  axios.post("http://192.168.5.107:8000/api/updateStatus",{
    //   player_id:playerid,
    //   status:"not",
    //     }).then(function(response){
    //         console.log("not select")
    //       console.log(response.data.message);
    //       if(response.data.message == "Player is not selected yet")
    //       {
    //           alert("droped");
    //       }
    //       else{
    //         alert("player is droped successfully");
    //       }
    //      // self.setState({totalPlayers:response.data.data});
    //       //console.log(self.state.totalPlayers);
    // })
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
                Upcomming Tournamentt
              </Text>
            </Body>
          </Header>

          <Content>
            {this.state.isVisible ? (
              this.state.trmntTeams.map(trmntTeams => (
                <Card key={trmntTeams.id}>
                  <CardItem style={{ backgroundColor: "#fff" }}>
                    <Body>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 14,
                          fontWeight: "bold"
                        }}
                      >
                        <Text>Team Name : </Text>
                        {trmntTeams.name}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 14,
                          fontWeight: "bold"
                        }}
                      >
                        <Text>Match Vanue : </Text>
                        {trmntTeams.venue}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 14,
                          fontWeight: "bold"
                        }}
                      >
                        <Text>Start Date : </Text>
                        {trmntTeams.startingDate}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 14,
                          fontWeight: "bold"
                        }}
                      >
                        <Text>Ending Date :</Text>
                        {trmntTeams.endingDate}
                      </Text>
                      <View style={styles.container}>
                        <Button
                          style={{
                            backgroundColor: "#3C7DFE",
                            width: 80,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                          onPress={() =>
                            this.selectplayer(
                              trmntTeams.id,
                              trmntTeams.requiredTeam
                            )
                          }
                        >
                          <Text
                            style={{
                              color: "white",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            Join
                          </Text>
                        </Button>

                        {/* <Button 
                            style={{backgroundColor:'#FF0000'}} 
                            onPress={() => this.dropplayer(trmntTeams.id,trmntTeams.requiredTeam)}
                            >
                            <Text style={{color: 'white',justifyContent:'center',alignItems:'center'}}>Left</Text>
                            </Button> */}
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              ))
            ) : (
              <View>{this.back()}</View>
            )}
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5
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
export default UpcommingTrmnt;
