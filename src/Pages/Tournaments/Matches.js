import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  View,
  Text,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Button,
  Title,
  Content,
  List,
  ListItem,
  Card
} from "native-base";
import ModalExample from "../../components/Modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SpinnerComponent } from "../../components/Spinner";
import { apiCreator } from "../../common/index";

export default function Matches(props) {
  const [matchesList, setMatchesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getMatchesHandler();
  }, []);

  async function getMatchesHandler() {
    try {
      setIsLoading(true);
      const { tournmanetId } = props.navigation.state.params;
      const response = await apiCreator({
        method: "POST",
        endPoint: "/matchsSchedule",
        body: { tournament_id: tournmanetId }
      });
      setMatchesList(response.matches ? response.matches : []);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  function showModal(match) {
    setModalVisible(true);
    setModalData(match);
  }

  function onRequestClose() {
    setModalVisible(false);
  }

  function matchCard(match) {
    return (
      <TouchableOpacity key={match.id} onPress={() => showModal(match)}>
        <Card>
          <List>
            <ListItem>
              <Left style={styles.ListItemleft}>
                <Text>Venue</Text>
              </Left>
              <Right style={styles.ListItemright}>
                <Text style={styles.capitalizeText}>{match.venue}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left style={styles.ListItemleft}>
                <Text>Match Date</Text>
              </Left>
              <Right style={styles.ListItemright}>
                <Text>{match.date}</Text>
              </Right>
            </ListItem>
          </List>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <Container style={styles.Container}>
      <Header translucent={false} style={{ backgroundColor: "#154360" }}>
        <Left style={styles.flex1}>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ ...styles.flex1, ...styles.Body }}>
          <Title>Matches</Title>
        </Body>
        <Right />
      </Header>

      <ModalExample
        modalVisible={modalVisible}
        onRequestClose={onRequestClose}
        modalData={modalData}
        navigation={props.navigation}
      />

      {isLoading ? (
        <SpinnerComponent />
      ) : matchesList.length === 0 ? (
        <View style={styles.notFountView}>
          <Text style={styles.notFountText}>No Match Found</Text>
        </View>
      ) : (
        <Content padder>{matchesList.map(match => matchCard(match))}</Content>
      )}
    </Container>
  );
}

export const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
  flex1: {
    flex: 1
  },
  Body: {
    justifyContent: "center"
  },
  notFountView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  notFountText: {
    textAlign: "center",
    fontSize: 20
  },
  ListItemright: {
    flex: 1
  },
  ListItemleft: {
    flex: 0.6
  },
  capitalizeText: {
    textTransform: "capitalize"
  }
});
