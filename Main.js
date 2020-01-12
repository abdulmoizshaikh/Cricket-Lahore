import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import SignIn from "./src/Pages/SignIn";
import Startapp from "./src/Pages/Startapp";
import Registration from "./src/Pages/Registration";
import MainPage from "./src/routes";
import CreateJoin from "./src/Pages/CreateJoin";

import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    global.url = "http://demo.ciitlhr.hosting.acm.org/public";
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userlogin = await AsyncStorage.getItem("userlogin");
    const newplayer = await AsyncStorage.getItem("newPlayer");
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log("JSON.parse(userlogin) in App.js", JSON.parse(userlogin));
    console.log("newplayer  in App.js", newplayer);
    if (newplayer) {
      this.props.navigation.navigate("Join");
    } else {
      this.props.navigation.navigate(
        userlogin && JSON.parse(userlogin).admin
          ? "Tournaments"
          : userlogin
          ? "App"
          : "Auth"
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        {/* <StatusBar barStyle="default" /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const AppStack = createStackNavigator(
  { Home: { screen: MainPage } },
  {
    headerMode: "none",
    navigationOptions: { headerVisible: false }
  }
);
const AuthStack = createStackNavigator({
  Startapp: { screen: Startapp },
  Registration: { screen: Registration },
  SignIn: { screen: SignIn }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Join: CreateJoin,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
