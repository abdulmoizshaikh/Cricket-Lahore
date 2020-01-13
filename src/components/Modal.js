import React, { Component } from "react";
import { Modal, StyleSheet } from "react-native";
import { Text, View, Container, Form, Icon, Picker, Button } from "native-base";

export default class ModalExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        team1Id: "",
        team2Id: "",
        tournamentId: "",
        matchId: "",
        tossWonBy: "",
        choseTo: "",
        overs: ""
      }
    };
  }

  componentWillReceiveProps(props) {
    const { modalData } = props;
    const { team1Id, team2Id, tournamentId, matchId } = this.state;
    if (
      !Boolean(team1Id) &&
      !Boolean(team2Id) &&
      !Boolean(tournamentId) &&
      !Boolean(matchId)
    ) {
      this.setState({
        data: {
          ...this.state.data,
          team1Id: modalData.team_id1,
          team2Id: modalData.team_id2,
          tournamentId: modalData.tournament_id,
          matchId: modalData.id
        }
      });
    }
  }

  onValueChange(name, value) {
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  }
  onPlayMatch = () => {
    console.log("this.state.data", this.state.data);
    this.props.onRequestClose();
    this.props.navigation.navigate("match_list");
  };

  render() {
    const { modalVisible, modalData, onRequestClose } = this.props;

    return (
      // <Container style={{ backgroundColor: "gray" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => onRequestClose()}
      >
        <Container style={styles.Container}>
          <Form style={styles.Form}>
            <View style={styles.formFieldWrapper}>
              <View style={styles.leftItemWrapper}>
                <Text style={styles.leftText}>Toss Won By</Text>
              </View>
              <Picker
                mode="dropdown"
                iosHeader="Over"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.data.tossWonBy}
                onValueChange={value => this.onValueChange("tossWonBy", value)}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Team 1" value="Team 1" />
                <Picker.Item label="Team 2" value="Team 2" />
              </Picker>
            </View>

            <View style={styles.formFieldWrapper}>
              <View style={styles.leftItemWrapper}>
                <Text style={styles.leftText}>Chose to</Text>
              </View>
              <Picker
                mode="dropdown"
                iosHeader="Over"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.data.choseTo}
                onValueChange={value => this.onValueChange("choseTo", value)}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Bat" value="Bat" />
                <Picker.Item label="Field" value="Field" />
              </Picker>
            </View>

            <View style={styles.formFieldWrapper}>
              <View style={styles.leftItemWrapper}>
                <Text style={styles.leftText}>Total Overs</Text>
              </View>
              <Picker
                mode="dropdown"
                iosHeader="Over"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.data.overs}
                onValueChange={value => this.onValueChange("overs", value)}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="20" value="20" />
              </Picker>
            </View>

            <Button style={styles.Button} onPress={this.onPlayMatch}>
              <Text>Play</Text>
            </Button>
          </Form>
        </Container>
      </Modal>
      // </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(49, 46, 46, 0.8)"
  },
  Form: {
    padding: 20,
    backgroundColor: "#eee",
    width: "80%",
    borderRadius: 10
  },
  formFieldWrapper: {
    flexDirection: "row"
  },
  leftItemWrapper: {
    justifyContent: "center",
    width: "50%"
  },
  leftText: {
    fontSize: 16
  },
  Button: {
    marginTop: 30,
    justifyContent: "center",
    elevation: 0
  }
});
