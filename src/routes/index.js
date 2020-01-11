import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import Setting from "../Pages/Setting";
import UpcommingTrmnt from "../Pages/UpcommingTrmnt";
import StartMatch from "../Pages/StartMatch";
import MatchesSchedule from "../Pages/MatchesSchedule";
import JoinedTrmnt from "../Pages/JoinedTrmnt";
import ChangeRole from "../Pages/ChangeRole";
import CreateTeam from "../Pages/CreateTeam";
import TeamPlayers from "../Pages/TeamPlayers";
import SelectedEleven from "../Pages/SelectedEleven";
import AddPlayer from "../Pages/AddPlayer";
import Help from "../Pages/Help";
import JoinTeam from "../Pages/JoinTeam";
import PlayerInfo from "../Pages/PlayerInfo";
import Dashboard from "../Pages/Dashboard";
import Profile from "../Pages/Profile";
import CreateJoin from "../Pages/CreateJoin";
import drawerContentComponents from "../Pages/drawerContentComponents";
//drawer code

const MainPage_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      title: "Dashboard",
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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
      headerLeft: <Dashboard navigationProps={navigation} />,
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

    Dashboard: {
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
