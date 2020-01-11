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
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Setting from "./Setting";
import UpcommingTrmnt from "./UpcommingTrmnt";
import StartMatch from "./StartMatch";
import MatchesSchedule from "./MatchesSchedule";
import JoinedTrmnt from "./JoinedTrmnt";
import ChangeRole from "./ChangeRole";
import CreateTeam from "./CreateTeam";
import TeamPlayers from "./TeamPlayers";
import SelectedEleven from "./SelectedEleven";
import AddPlayer from "./AddPlayer";
import Help from "./Help";
import JoinTeam from "./JoinTeam";
import PlayerInfo from "./PlayerInfo";
import axios from "axios";
import Profile from "./Profile";
import CreateJoin from "./CreateJoin";
import { AsyncStorage, ScrollView } from "react-native";
import drawerContentComponents from "./drawerContentComponents";

var myBackground = require("../assets/icons/backgrnd.jpg");
var myimage = require("../assets/icons/profile_img1.jpg");
var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

class MainPage extends React.Component {
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
      <View style={styles.container}>
        <Container style={{ paddingTop: 23 }}>
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
                    onPress={() =>
                      this.props.navigation.navigate("TeamPlayers")
                    }
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
                          <Text style={styles.textstyle}>
                            Comming Tournament
                          </Text>
                        </Body>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </Content>
                <Content>
                  <TouchableOpacity
                    style={styles.touchablestyle}
                    onPress={() =>
                      this.props.navigation.navigate("JoinedTrmnt")
                    }
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
      </View>
    );
  }
}

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

//drawer code

const MainPage_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: MainPage,
    navigationOptions: ({ navigation }) => ({
      title: "MainPage",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});
const Profile_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Second: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: "Profile",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const Help_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  Third: {
    screen: Help,
    navigationOptions: ({ navigation }) => ({
      title: "Help",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const Setting_StackNavigator = createStackNavigator({
  //All the screen from the Screen3 will be indexed here
  Fourth: {
    screen: Setting,
    navigationOptions: ({ navigation }) => ({
      title: "Setting",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const CreateJoin_StackNavigator = createStackNavigator({
  //All the screen from the Screen3 will be indexed here
  Fifth: {
    screen: CreateJoin,
    navigationOptions: ({ navigation }) => ({
      title: "CreateJoin",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});
const CreateTeam_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  sixth: {
    screen: CreateTeam,
    navigationOptions: ({ navigation }) => ({
      title: "CreateTeam",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});
const JoinTeam_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  seventh: {
    screen: JoinTeam,
    navigationOptions: ({ navigation }) => ({
      title: "JoinTeam",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});
const TeamPlayers_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Eight: {
    screen: TeamPlayers,
    navigationOptions: ({ navigation }) => ({
      title: "TeamPlayers",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});
const SelectedEleven_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  ninth: {
    screen: SelectedEleven,
    navigationOptions: ({ navigation }) => ({
      title: "SelectedEleven",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

const UpcommingTrmnt_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Screent: {
    screen: UpcommingTrmnt,
    navigationOptions: ({ navigation }) => ({
      title: "UpcommingTrmnt",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});
const AddPlayer_StackNavigator = createStackNavigator({
  Screents: {
    screen: AddPlayer,
    navigationOptions: ({ navigation }) => ({
      title: "AddPlayer",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});
const JoinedTrmnt_StackNavigator = createStackNavigator({
  Screentd: {
    screen: JoinedTrmnt,
    navigationOptions: ({ navigation }) => ({
      title: "JoinedTrmnt",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});
const ChangeRole_StackNavigator = createStackNavigator({
  Screentdds: {
    screen: ChangeRole,
    navigationOptions: ({ navigation }) => ({
      title: "ChangeRole",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});
const PlayerInfo_StackNavigator = createStackNavigator({
  Screentdts: {
    screen: PlayerInfo,
    navigationOptions: ({ navigation }) => ({
      title: "PlayerInfo",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});
const MatchesSchedule_StackNavigator = createStackNavigator({
  Screentss: {
    screen: MatchesSchedule,
    navigationOptions: ({ navigation }) => ({
      title: "MatchesSchedule",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});
const StartMatch_StackNavigator = createStackNavigator({
  Screentsst: {
    screen: StartMatch,
    navigationOptions: ({ navigation }) => ({
      title: "StartMatch",
      headerLeft: <MainPage navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FF9800"
      },
      headerTintColor: "#fff"
    })
  }
});

export default DrawerNavigatorExample = createDrawerNavigator(
  {
    //Drawer Optons and indexing

    MainPage: {
      //Title
      screen: MainPage_StackNavigator,
      navigationOptions: {
        drawerLabel: "Home"
      }
    },
    Profile: {
      //Title
      screen: Profile_StackNavigator,
      navigationOptions: {
        drawerLabel: "Profile"
      }
    },
    Help: {
      //Title
      screen: Help_StackNavigator,
      navigationOptions: {
        drawerLabel: "Help"
      }
    },
    CreateJoin: {
      //Title
      screen: CreateJoin_StackNavigator,
      navigationOptions: {
        drawerLabel: "Create and Join"
      }
    },
    Setting: {
      //Title
      screen: Setting_StackNavigator,
      navigationOptions: {
        drawerLabel: "Setting"
      }
    },
    CreateTeam: {
      //Title
      screen: CreateTeam_StackNavigator,
      navigationOptions: {
        drawerLabel: "CreateTeam"
      }
    },
    JoinTeam: {
      //Title
      screen: JoinTeam_StackNavigator,
      navigationOptions: {
        drawerLabel: "JoinTeam"
      }
    },
    TeamPlayers: {
      //Title
      screen: TeamPlayers_StackNavigator,
      navigationOptions: {
        drawerLabel: "TeamPlayers"
      }
    },
    SelectedEleven: {
      //Title
      screen: SelectedEleven_StackNavigator,
      navigationOptions: {
        drawerLabel: "SelectedEleven"
      }
    },
    UpcommingTrmnt: {
      //Title
      screen: UpcommingTrmnt_StackNavigator,
      navigationOptions: {
        drawerLabel: "UpcommingTrmnt"
      }
    },
    AddPlayer: {
      //Title
      screen: AddPlayer_StackNavigator,
      navigationOptions: {
        drawerLabel: "AddPlayer"
      }
    },
    JoinedTrmnt: {
      //Title
      screen: JoinedTrmnt_StackNavigator,
      navigationOptions: {
        drawerLabel: "JoinedTrmnt"
      }
    },
    ChangeRole: {
      //Title
      screen: ChangeRole_StackNavigator,
      navigationOptions: {
        drawerLabel: "ChangeRole"
      }
    },
    PlayerInfo: {
      //Title
      screen: PlayerInfo_StackNavigator,
      navigationOptions: {
        drawerLabel: "PlayerInfo"
      }
    },
    MatchesSchedule: {
      //Title
      screen: MatchesSchedule_StackNavigator,
      navigationOptions: {
        drawerLabel: "MatchesSchedule"
      }
    },
    StartMatch: {
      //Title
      screen: StartMatch_StackNavigator,
      navigationOptions: {
        drawerLabel: "StartMatch"
      }
    }
  },
  {
    contentComponent: drawerContentComponents
  }
);
