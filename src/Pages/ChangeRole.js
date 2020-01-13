import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
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
  Picker,
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
import { CheckBox } from "react-native-elements";

class ChangeRole extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      userLogin: [],
      roledata: [],
      dob: "",
      contact: "",
      address: "",
      city: "",
      selected: "",
      playerRole: "",
      isVisible: true
    };
    this.getEmail();
  }

  // getteamtID = async() => {

  //     AsyncStorage.getItem('teamid')
  //     .then(string=>{
  //       //console.log(string);
  //       this.setState(
  //         {team_id: JSON.parse(string)}
  //         );
  //       // console.log(this.state.team_id);
  //       this.getEmail();
  //       }
  //      );
  // }
  getEmail = () => {
    AsyncStorage.getItem("userlogin").then(string => {
      //console.log(string);
      this.setState({ userLogin: JSON.parse(string) });
      console.log(this.state.userLogin);
      // this.playerRole();
    });
  };
  playerRole = () => {
    console.log(this.state.userLogin.id);
    var self = this;

    axios
      .post(global.url + "/api/playerRole", {
        player_id: self.state.userLogin.id
      })
      .then(function(response) {
        //console.log(response.data.role);
        if (response.data.success) {
          console.log("true");
          self.setState({ roledata: response.data.role.roledata });
          console.log(self.state.roledata);
          //self.setState({isVisible:true})
        } else {
          console.log("error");
        }
        //console.log(self.state.selected);
      });
  };
  saveUpdates = () => {
    console.log(this.state.selected);
    //var player_id=this.state.userLogin.id;
    var self = this;
    axios
      .post(global.url + "/api/RoleProfileUpdate", {
        player_id: this.state.userLogin.id,
        dob: this.state.dob,
        contact: this.state.contact,
        city: this.state.city,
        address: this.state.address,
        role_id: this.state.selected
      })
      .then(function(response) {
        console.log(response.data.updating);
        if (response.data.success) {
          console.log("true");
          ToastAndroid.show("Account Updated", ToastAndroid.LONG);
          self.props.navigation.navigate("MainPage");
        } else {
          ToastAndroid.show("Issue", ToastAndroid.LONG);
        }
        //self.setState({selected:response.data.role})
        //console.log(self.state.selected);
      });
  };

  render() {
    // var roledata = this.state.roledata.map(roledata => {
    //   return (
    //     <Picker.Item
    //       key={roledata.id}
    //       label={roledata.name}
    //       value={roledata.id.toString()}
    //     />
    //   );
    // });
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
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
                Settings
              </Text>
            </Body>
          </Header>
          <Content style={{ padding: 10 }}>
            {this.state.isVisible ? (
              <Card>
                <CardItem style={{ backgroundColor: "#fff" }}>
                  <Body>
                    <Label style={{ color: "black", fontWeight: "bold" }}>
                      DOB :{" "}
                    </Label>
                    <Item>
                      <Input
                        placeholder={this.state.userLogin.dob}
                        autoCorrect={false}
                        onChangeText={text => this.setState({ dob: text })}
                        getRef={a => (this._inputDes = a)}
                        blurOnSubmit={true}
                        // onSubmitEditing={event=>{
                        //   this._inputDe._root.focus();
                        // }}
                        blurOnSubmit={false}
                      />
                    </Item>
                    <Text></Text>
                    <Label style={{ color: "black", fontWeight: "bold" }}>
                      Contact :{" "}
                    </Label>
                    <Item>
                      <Input
                        placeholder={this.state.userLogin.contact}
                        autoCorrect={false}
                        onChangeText={text => this.setState({ contact: text })}
                        // getRef={d=>(this._inputD=d)}
                        // blurOnSubmit={true}
                        // onSubmitEditing={event=>{
                        //   this._inputDesce._root.focus();
                        // }}
                        blurOnSubmit={false}
                      />
                    </Item>
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      {this.state.contactflag}
                    </Text>

                    <Label style={{ color: "black", fontWeight: "bold" }}>
                      City :{" "}
                    </Label>
                    <Item>
                      <Input
                        placeholder={this.state.userLogin.city}
                        autoCorrect={false}
                        onChangeText={text => this.setState({ city: text })}
                        // getRef={e=>(this._inputDesce=e)}
                        // blurOnSubmit={true}
                        // onSubmitEditing={event=>{
                        //   this._inputDesces._root.focus();
                        // }}
                        blurOnSubmit={false}
                      />
                    </Item>
                    <Text></Text>
                    <Label style={{ color: "black", fontWeight: "bold" }}>
                      Address :{" "}
                    </Label>
                    <Item>
                      <Label
                        style={{ color: "black", fontWeight: "bold" }}
                      ></Label>
                      <Input
                        placeholder={this.state.userLogin.address}
                        autoCorrect={false}
                        onChangeText={text => this.setState({ address: text })}
                        // getRef={f=>(this._inputDesces=f)}
                        blurOnSubmit={false}
                      />
                    </Item>
                    <Text></Text>
                    <Label style={{ color: "black", fontWeight: "bold" }}>
                      Role :{" "}
                    </Label>
                    <Picker
                      note
                      mode="dropdown"
                      style={{ width: 250 }}
                      selectedValue={this.state.selected}
                      onValueChange={value =>
                        this.setState({ selected: value }, console.log(value))
                      }
                    >
                      <Picker.Item label="Batsman" value="1" />
                      <Picker.Item label="Medium Bowler" value="2" />
                      <Picker.Item label="Fast Bowler" value="3" />
                      <Picker.Item label="Spin Bowler" value="4" />
                      <Picker.Item label="All Rounder" value="5" />
                      <Picker.Item label="Wicket Keeper" value="6" />
                      <Picker.Item label="Captain" value="7" />
                      <Picker.Item label="medium Fast Bowler" value="8" />
                    </Picker>

                    <Text></Text>
                    {/* <Picker
                  style={{ borderColor: "#000" ,width:'100%'}}
                  // selectedValue={this.state.array}
                  // onValueChange={(value) => this.setState({"array": value})}
                  >
                    <Picker.Item label="Choose Option " value = "0" />
                    {roledata}
                  </Picker>  */}
                    <Text></Text>
                    <Button
                      //primary
                      style={{ backgroundColor: "#3C7DFE" }}
                      block
                      onPress={this.saveUpdates}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Update Profile
                      </Text>
                    </Button>
                  </Body>
                </CardItem>
              </Card>
            ) : null}
          </Content>
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
    resizeMode: "cover"
    // width: width,
    // height: height
  },
  error: {
    borderColor: "red",
    borderWidth: 1
  }
});
export default ChangeRole;
