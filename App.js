import React, { Component } from "react";
import { Root } from "native-base";
import Main from "./Main";
// import CricketRoutes from "./CricketRoutes";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import matchStore from "./src/store";

export default class App extends Component {
  async UNSAFE_componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    // this.setState({ loading: false });
  }

  render() {
    return (
      <Provider store={matchStore}>
        <Root>
          <Main />
          {/* <CricketRoutes /> */}
        </Root>
      </Provider>
    );
  }
}
