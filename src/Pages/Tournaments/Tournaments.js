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
  Spinner,
  Content,
  List,
  ListItem
} from "native-base";
import { apiCreator } from "../../common/index";
import { SpinnerComponent } from "../../components/Spinner";

export default function Tournaments(props) {
  const [tournamentList, setTournamentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTournamentsHandler();
  }, []);

  async function getTournamentsHandler() {
    try {
      setIsLoading(true);
      const response = await apiCreator({
        method: "GET",
        endPoint: "/tournament"
      });
      console.log("response", response);
      setTournamentList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // utils._toast("Somthing went Wrong! in get Categories", "error");
      setIsLoading(false);
    }
  }
  function tournamentMatches(tournmanetId) {
    props.navigation.navigate("Matches", { tournmanetId });
  }
  return (
    <Container>
      <Header translucent={false} style={{ backgroundColor: "#154360" }}>
        <Left style={styles.flex1}>
          <Button transparent onPress={() => props.navigation.toggleDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body style={{ ...styles.flex1, ...styles.Body }}>
          <Title>Tournaments</Title>
        </Body>
        <Right />
      </Header>

      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <Content>
          <List>
            {tournamentList.map(tournament => {
              return (
                <ListItem
                  style={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start"
                  }}
                  key={tournament.id}
                  onPress={() => tournamentMatches(tournament.id)}
                >
                  <Left style={styles.listItemLeft}>
                    <Text style={styles.leftTitleText}>{tournament.name}</Text>
                    <Text style={styles.leftTitleText} note>
                      {tournament.name}
                    </Text>
                  </Left>
                  <Right style={styles.listItemLeft}>
                    <Text
                      style={
                        tournament.status === "pending"
                          ? { color: "orange" }
                          : { color: "green" }
                      }
                      note
                    >
                      {tournament.status}
                    </Text>
                    {/* <Icon name="arrow-forward" /> */}
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
      )}
    </Container>
  );
}

export const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  Body: {
    justifyContent: "center"
  },
  leftTitleText: {
    alignSelf: "flex-start"
  },
  rightTitleText: {
    flexDirection: "column"
  },
  listItemLeft: {
    flex: 1,
    flexDirection: "column"
  }
});
