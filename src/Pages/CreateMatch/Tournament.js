import React, { useState } from "react";
import { Container, View, Text } from "native-base";

export default function Tournament(props) {
  const [tournamentList, setTournamentList] = useState([]);

  return (
    <Container>
      <Text>Tournament List</Text>
    </Container>
  );
}
